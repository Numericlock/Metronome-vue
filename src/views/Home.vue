<template>
  <div class="home">
    <div class="metronome">
        <Metronome ref="metronome" :bpm="bpm" :oneMusicalBar="oneMusicalBar" :soundMusicalBar = "soundMusicalBar"/>
    </div>
    <div class="metronome-controller">
        <div :class="['playback' ,{'pause': playbackNow}]" @click="suspend()"></div>
        <label>
            <span>bpm</span>
            <input type="text" class="textbox" v-model="bpm">
            🐢 
            <input type="range" name="speed" v-model="bpm" min="1" max="300">
            🐰
        </label>
        <label>
            <input type="checkbox" v-model="soundMusicalBar"/>
            <input type="text" class="textbox" v-model="oneMusicalBar">拍子毎
            <input type="range" name="beat" v-model="oneMusicalBar" min="2" max="14">
        </label>
    </div>
    
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
                bpm:60,
                oneMusicalBar:4,
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


</style>
