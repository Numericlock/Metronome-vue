<template>
    <div class="metronome-wrapper">
        <div class="hand-wrapper">
            <Hand class="hand" :rotate="pendulumAngle"/>
        </div>
        <div class="slider-wrapper">
        <!--    <vue-slider
              ref="slider"
              v-model="bpm"
              :min="1"
              :max="255"
            ></vue-slider>-->
            <button @click="sound">run</button>
        </div>
    </div>
</template>

<script>
//import VueSlider from 'vue-slider-component'
//import 'vue-slider-component/theme/default.css'
import Hand from './Hand.vue'
const fs = window.fs;
//const beat = new Audio('../../public/beat.mp3');

    export default{
        data() {
            return {
                elapsedTime:0,
                bpm:60,
                beat:"",
            }
        },
        components: {
            Hand,
          //  VueSlider,
        },
        props:{
            //bpm:{
            //    type: Number,
            //    default:120
            //},
            fps:{
                type: Number,
                default:30
            }
        },
        computed: {
            pendulumAngle() {
                const swingAngle = 90;
                const swingTime = Math.floor(this.elapsedTime/this.oneBeatSec());     //スイングした回数
                //console.log("swingTime:"+swingTime);
                const swingProgress = this.elapsedTime%this.oneBeatSec();              //スイングの進捗ミリ秒
            //    console.log("swingProgress:"+swingProgress);
                const swingProgressRate = (swingProgress/this.oneBeatSec())*100;    //スイングの進捗割合
                //console.log("swingProgressRate:"+swingProgressRate);
                let angle;
            
                if(swingProgressRate < 50) angle = (swingAngle/2)-((swingAngle/2)*((swingProgressRate*2)/100));
                else if(swingProgressRate > 50) angle = -(swingAngle/2)*(((swingProgressRate-50)*2)/100);
                else if (angle == 0) angle = (swingAngle/2);
                else angle = 0;
                console.log(swingTime);
                if((swingTime%2)==1){
                    angle = angle*-1;
                }
              //  console.log(angle);
                return Number(angle);
            },
        },
        methods: {
            //一拍の秒数
            oneBeatSec() {     
                const sec = (60/this.bpm)*1000;//ミリ秒
               // console.log("sec:"+sec);
                return sec;
            },
            //再描画間隔
            rerenderInterval() {
                const interval = 1000/this.fps;
                return interval;
            },
            //再帰的に使える用の関数
            elapsedTimeCountUp() {
                //timerId変数はsetTimeoutの返り値になるので代入する
                const interval = this.rerenderInterval();
                window.setTimeout(() =>{

                    //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
                    this.elapsedTime = this.elapsedTime+interval;
                   // console.log("elapsedTime:" + this.elapsedTime);
                    //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
                    this.elapsedTimeCountUp();
                //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
                },interval);
            },
            setBeat() {
                this.beat.preload = "auto";
                this.beat.src = './beat.mp3';
                this.beat.load();
                this.soundBeat();
            },
            soundBeat() {
               // this.beat.play();
                this.sound();
                const interval = this.oneBeatSec();
                window.setTimeout(() =>{
                    
                    this.soundBeat();
                },interval);
            },
            sound() {
               // let source;
               // const audioContext = new AudioContext;
               // const textfile = fs.readFileSync('./public/beat.mp3');
               //// console.log(textfile);
               // const toArrayBuffer = function(buf) {
               //     return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
               // }
               // 
               // audioContext.decodeAudioData(toArrayBuffer(textfile), function(buffer) {
               //    // console.log("a");
               //     if (source) {
               //         source.stop();
               //     }
               //     source = audioContext.createBufferSource();
               //     source.buffer = buffer;
               //     source.start(0);
               //     console.log("a");
               // });
                
                let source;
                let audioContext;
                audioContext = new AudioContext;
                let textfile = fs.readFileSync('./public/beat.mp3', (err) => {
                        if (err) throw err;
                    });
                const toArrayBuffer = function(buf) {
                    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
                }
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 512;
                analyser.connect(audioContext.destination);
                audioContext.decodeAudioData(toArrayBuffer(textfile), function(buffer) {
                    if (source) {
                        source.stop();
                    }
                    if(audioContext){
                        source = audioContext.createBufferSource();
                        source.buffer = buffer;
                        //source.loop = true;
                        source.connect(analyser);
                        source.start(0);
                        this.loading = false;
                        this.playbackNow = true;
                    }else{
                        this.loading = false;
                    }
                }.bind(this));
            }
        },
        mounted(){
           this.elapsedTimeCountUp();
           this.setBeat();
           this.soundBeat();
        }
    };
</script>

<style lang="scss" scoped>
    .metronome-wrapper{
        display: flex;
        flex-direction: column;
        .hand-wrapper{
            height:200px;
            .hand {
                position: absolute;
                left: 150px;
                top: 20px;
                background:red;
            }
        }
    }
</style>