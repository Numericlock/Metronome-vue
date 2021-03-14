<template>
  <div class="home">
    <div class="metronome">
        <Metronome ref="metronome" :bpm="bpm" :oneMusicalBar="oneMusical.bar" :soundMusicalBar = "soundMusicalBar"/>
    </div>
    <div class="metronome-controller">
        <div :class="['playback' ,{'pause': playbackNow}]" @click="suspend()"></div>
        <label>
            <span>bpm</span>
            <input type="text" class="textbox" v-model="bpm.bpm">
            🐢 
            <input type="range" name="bpm" class="slider" :class="{'danger': bpm.isDanger}" v-model="bpm.bpm" :min="bpm.min" :max="bpm.max">
            🐰
        </label>
        <label>
            <input type="checkbox" v-model="soundMusicalBar"/>
            <input type="text" class="textbox" v-model="oneMusical.bar">拍子毎
            <input type="range" name="beat" class="slider" :class="{'danger': oneMusical.isDanger}" v-model="oneMusical.bar" :min="oneMusical.min" :max="oneMusical.max">
        </label>
    </div>
    {{oneMusical.isDanger}}
  </div>
</template>

<script>
import Metronome from '../components/Metronome.vue'; 
//import flexibleTextbox from '../components/flexibleTextbox.vue'; 
//import Polygon from '../components/polygon.vue'; 
    
    export default{
        name: 'app',
        components: {
            Metronome,
          //  flexibleTextbox
         //   Polygon
        },
        data() {
            return {
                bpm:{
                    bpm:60,
                    min:1,
                    max:300,
                    isDanger:false
                },
                oneMusical:{
                    bar:4,
                    min:2,
                    max:14,
                    isDanger:false
                },
                musicalBarVals:[2,3,4,5,6,7,8,9,10,11,12,13,14],
                vertex:5,
                soundMusicalBar:true,
                playbackNow:false,
            };
        },
        methods:{
            suspend() {
                if(this.playbackNow){
                    this.playbackNow = false;
                    this.$refs.metronome.stopMetronome();
                }
                else{
                    this.playbackNow = true;
                    this.$refs.metronome.runMetronome();
                } 
            },

        },
        watch:{
            'oneMusical.bar'(){
                if(this.oneMusical.bar>this.oneMusical.max)this.oneMusical.isDanger = true;
                else this.oneMusical.isDanger = false;
            },
            'bpm.bpm'(){
                if(this.bpm.bpm>this.bpm.max)this.bpm.isDanger = true;
                else this.bpm.isDanger = false;
            }
        }
    };
</script>
<style lang="scss">
    .home{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: bold;
        color:white;
        background: linear-gradient(-135deg, #E4A972, #39ACAC),
        linear-gradient(75deg, #E4A972, #9941D8 ,#79ffff)fixed;
        border-radius: 15px;
        padding:10px;
        .metronome-controller{
            display: flex;
            flex-direction: column;
            margin-top:10px;
            padding:10px 30px;
            background: rgba( 62, 62, 62, 0.50 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 5.0px );
            -webkit-backdrop-filter: blur( 5.0px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
            .textbox{
                border:none;
                background:none;
                font-weight: bold;
                color:white;
                width:40px;
            }
        }
    }
.playback{
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 30px solid #6aa7cd;
    border-radius: 5px;
    transition:  border-left 0.1s,  border-right 0.1s;
}   
.pause{
    border-left: 10px solid #6aa7cd;
    border-right: 10px solid #6aa7cd;
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-radius: 0px;
    height:30px;
    width:15px;
    transition: border-left 0.1s, border-right 0.1s ;
}
    .slider{
        -webkit-appearance: none; // これ無しだとスタイルがほぼ全く反映されないので注意
        appearance: none;
        cursor: pointer; // カーソルを分かりやすく
        background: #8acdff; // バーの背景色
        height: 14px; // バーの高さ
        width: 100%; // スライダーの幅
        border-radius: 10px; // バーの端の丸み
        border: solid 3px #dff1ff; // バーまわりの線
        outline: 0; /* アウトラインを消して代わりにfocusのスタイルをあてる */
        &:focus {
            box-shadow: 0 0 3px rgb(0, 161, 255);
        }
    }
    .danger{
        background:red;
    }


</style>
