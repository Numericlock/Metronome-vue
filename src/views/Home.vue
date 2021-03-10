<template>
  <div class="home">
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
import Metronome from '../components/Metronome.vue'; // @ is an alias to /src
    export default{
        name: 'app',
        components: {
            Metronome
        },
        data() {
            return {
                bpm:60,
                oneMusicalBar:4,
                musicalBarVals:[2,3,4,5,6]
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
