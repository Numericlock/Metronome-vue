<template>
    <div class="metronome-wrapper dark">
        <!--<div class="hand-wrapper">
            <Hand class="hand" :rotate="pendulumAngle"/>
        </div>
        <div class="musicalbar-view">
            <div v-for="n in oneMusicalBar" :key="n" :class="[{ 'beat-now': (n==beatNow+1) }, 'one-beat']"></div>
        </div>
-->
        <polygonMetronome :oneMusicalBar="oneMusicalBar" :beatAngle="beatAngle2" :beatNow="beatNow" :soundMusicalBar="soundMusicalBar" />
    </div>
</template>

<script>
    //import Hand from './Hand.vue'
    import polygonMetronome from './polygonMetronome.vue'
    const fs = window.fs;
    let source;
    let audioContext;
    let toArrayBuffer;
    let textfile;
    let gainNode;
    export default {
        data() {
            return {
                elapsedTime: 0,
                beat: "",
                isMetronomeRunning: false,
                beatTime: 0,
                swingAngle: 90,
                beatAngle: 0,
                edgeLength: 100,
                vertex: 5
            }
        },
        components: {
            polygonMetronome
        },
        props: {
            bpm: {
                type: Number,
                default: 60
            },
            fps: {
                type: Number,
                default: 30
            },
            oneMusicalBar: {
                type: Number,
            },
            soundMusicalBar: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            pendulumAngle() {
                const swingAngle = 90;
                const swingProgress = this.elapsedTime % this.oneBeatSec(); //スイングの進捗ミリ秒
                const swingProgressRate = (swingProgress / this.oneBeatSec()) * 100; //スイングの進捗割合
                let angle;

                if (swingProgressRate < 50) angle = (swingAngle / 2) - ((swingAngle / 2) * ((swingProgressRate * 2) / 100));
                else if (swingProgressRate > 50) angle = -(swingAngle / 2) * (((swingProgressRate - 50) * 2) / 100);
                else if (angle == 0) angle = (swingAngle / 2);
                else angle = 0;
                if (((Math.floor(this.elapsedTime / this.oneBeatSec())) % 2) == 1) {
                    angle = angle * -1;
                }
                return Number(angle);
            },
            beatNow() {
                return (this.beatTime + this.oneMusicalBar) % this.oneMusicalBar;
            },
            beatAngle2() {
                return this.beatAngle;
            }
        },
        methods: {
            //一拍の秒数
            oneBeatSec() {
                const sec = (60 / this.bpm) * 1000; //ミリ秒
                return sec;
            },
            //beatが鳴った回数
            //beatTime(){
            //    return Math.floor(this.elapsedTime/this.oneBeatSec());  
            //},

            // swing(){
            //     const swingProgress = this.elapsedTime%this.oneBeatSec();              //スイングの進捗ミリ秒
            //     const swingProgressRate = (swingProgress/this.oneBeatSec())*100;    //スイングの進捗割合
            //     
            //     
            //     
            // },


            //再描画間隔
            rerenderInterval() {
                const interval = 1000 / this.fps;
                return interval;
            },
            //再帰的に使える用の関数
            elapsedTimeCountUp() {
                if (this.isMetronomeRunning) {
                    const interval = this.rerenderInterval();
                    window.setTimeout(() => {
                        this.elapsedTime = this.elapsedTime + interval;
                        this.elapsedTimeCountUp();
                    }, interval);
                }
            },
            soundBeat() {
                let beatVolume = 0.5;
                if (this.oneMusicalBar != 0 && (this.beatTime % this.oneMusicalBar) == 0 && this.soundMusicalBar) {
                    beatVolume = 1;
                }
                source = audioContext.createBufferSource();
                audioContext.decodeAudioData(toArrayBuffer(textfile), function(buffer) {
                    source.buffer = buffer;
                    gainNode = audioContext.createGain();
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    gainNode.gain.value = beatVolume;
                    source.start(0);
                });
            },
            beatAngleCount() {
                this.beatAngle = this.beatAngle + (360 / this.oneMusicalBar);
            },
            beatLoop() {
                if (this.isMetronomeRunning) {
                    // this.beat.play();
                    this.beatTime++;
                    this.elapsedTime = this.beatTime * this.oneBeatSec();
                    // this.elapsedTime = this.beatTime*this.oneBeatSec();
                    this.beatAngleCount();
                    this.soundBeat();

                    const interval = this.oneBeatSec();
                    window.setTimeout(() => {

                        this.beatLoop();
                    }, interval);
                }
            },
            setBeat() {
                audioContext = new AudioContext;
                textfile = fs.readFileSync('./public/beat.mp3', (err) => {
                    if (err) throw err;
                });
                toArrayBuffer = function(buf) {
                    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
                }
            },
            runMetronome() {
                if (!this.isMetronomeRunning) {
                    this.isMetronomeRunning = true;
                    this.setBeat();
                    this.elapsedTimeCountUp();
                    this.beatLoop();
                }
            },
            stopMetronome() {
                if (this.isMetronomeRunning) {
                    this.isMetronomeRunning = false;
                    this.beatTime = 0;
                    this.beatAngle = 0;
                    this.elapsedTime = 0;
                }
            },

        },
        mounted() {
            //this.elapsedTimeCountUp();
            //this.setBeat();
            //this.beatLoop();
        },
        watch: {
            oneMusicalBar: function() {

                this.beatAngle = ((this.beatTime + this.oneMusicalBar) % this.oneMusicalBar) * (360 / this.oneMusicalBar);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .metronome-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        .musicalbar-view {
            display: flex;
            justify-content: space-around;
            position: relative;

            .one-beat {
                border-radius: 100%;
                height: 10px;
                width: 10px;
                background: red;
            }

            .one-beat2 {
                border-radius: 100%;
                height: 10px;
                width: 10px;
                background: red;
                position: absolute;

            }

            .beat-now {
                background: black;
            }
        }

        .hand-wrapper {
            height: 200px;
            position: relative;

            .hand {
                position: absolute;
                left: 150px;
                top: 20px;
                background: red;
            }
        }

        .handball-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            .hand-ball {
                position: absolute;
                border-radius: 100%;
                background: red;
                width: 20px;
                height: 20px;
                transform-origin: 10px 210px;
                top: 90px;
                background: rgba(62, 62, 62, 0.50);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                backdrop-filter: blur(5.0px);
                -webkit-backdrop-filter: blur(5.0px);
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.18);
            }
        }
    }
</style>