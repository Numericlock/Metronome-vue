<template>
    <div class="hand" :style="{'transform': 'rotate(' + rotate + 'deg)'}" />
</template>

<script lang="ts">
    export default {
        name: 'Hand',
        props: {
            rotate:{
                type:Number,
                default:0
            }
        }
    }
</script>

<style scoped>
    .hand {
        background-color: rgba(255,255,255,0.8);
        width: 5px;
        height: 150px;
        z-index:100;
        transform-origin: 2.5px 130px;
    }
</style>