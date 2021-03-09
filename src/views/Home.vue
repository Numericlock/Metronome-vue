<template>
  <div class="home">
    <div class="metronome">
        <Metronome/>
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

            };
        },
        computed: {

        },
        methods: {
        }
    };
</script>
