<template>
  <div class="home">
    <input type="range" v-model="vertex"  min="3" max="12"/>
    <Polygon :vertex="vertex"/>
    <div class="metronome">
        <Metronome :bpm="bpm" :oneMusicalBar="oneMusicalBar2"/>
        <span>bpm</span><span>{{ bpm }}</span>
        🐢 <input type="range" name="speed" v-model="bpm" min="1" max="1000"> 🐰
    </div>
    <div>
        <button >ON</button>
        {{oneMusicalBar}}
        <button>OFF</button>
        <label v-for="(musicalBarVal,index) in musicalBarVals" :key="index"><input type="radio" name="one_musical_bar" v-model="oneMusicalBar" :value="musicalBarVal">{{musicalBarVal}}</label>
    </div>
  </div>
</template>

<script>
import Metronome from '../components/Metronome.vue'; 
import Polygon from '../components/polygon.vue'; 
    export default{
        name: 'app',
        components: {
            Metronome,
            Polygon
        },
        data() {
            return {
                bpm:60,
                oneMusicalBar:4,
                musicalBarVals:[2,3,4,5,6],
                vertex:5
            };
        },
        computed: {
            oneMusicalBar2(){
                return this.oneMusicalBar;
            }
        },
        methods: {
        }
    };
</script>
<style>
    .home{
        display: flex;
        flex-direction: column;
        font-weight: bolder;
        background: linear-gradient(-135deg, #E4A972, #9941D8),
        linear-gradient(75deg, #E4A972, #9941D8 ,#79ffff)fixed;
        border-radius: 15px;
        padding:0px 10px;
    }
</style>
