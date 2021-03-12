<template>
    <div>
        <div v-if="vertex%2 == 1" class="lists--odd">
          <h2>{{ vertex }}</h2>
          <div class="polygon" :style="{width: size + 'px', height: size + 'px'}">
            <div v-for="k in vertex*2" :key="k" class="rect"
                :style="{width: sideLength + 'px' , height: apothem*2 + 'px' , transform: 'rotate(' + centralAngle*k + 'deg)'}"></div>
          </div>
        </div>
        <div v-if="vertex%2 == 0" class="lists">
          <h2>{{ vertex }}</h2>
          <div class="polygon" :style="{width: size + 'px', height: size + 'px'}">
            <div v-for="n in vertex/2" :key="n" class="rect"
                :style="{width: sideLength + 'px' , height: apothem*2 + 'px' , transform: 'rotate(' + centralAngle*n + 'deg)'}"></div>
          </div>
        </div>    
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props:{
            vertex:{
                type: Number,
                default:5
            },
            size:{
                type: Number,
                default:400
            }
        },
        components: {
        },
        computed: {
            sideLength(){
                const baseAngle = 180/this.vertex;
                console.log(Math.sin(baseAngle*(Math.PI/180)));
                return this.size*Math.sin(baseAngle*(Math.PI/180));
            },
            apothem(){
                const baseAngle = 180/this.vertex;
                return (this.size/2)*Math.cos(baseAngle*(Math.PI/180));
            },
            centralAngle(){
                return 360/this.vertex;
            }
        },
        method: {
            baseAngle(){
                return 180/this.vertex;
            }
        }
    }
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Quattrocento+Sans);

$size: 400px;
$bk-color: #f5f5f5;
$border-color: #333;
$rect-even-color: transparent;
$rect-odd-color: transparent;
$text-even-color: #000;
$text-odd-color: #000;

@mixin center {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

@mixin center-tf {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

@mixin border {
  box-sizing: border-box;
  border: 1px solid $border-color;
  border-left: none;
  border-right: none;
}

.list {
  text-align: center;
}

.lists,
.lists--odd {
  position: relative;
  display: inline-block;
  width: 10%;
  min-width: $size * 1.5;
  height: $size * 1.5;
  h2 {
    font-size: 12px;
    color: $text-even-color;
    font-family: 'Quattrocento Sans';
    z-index: 1;
    @include center-tf;
  }
}

.lists--odd {
  h2 {
    color: $text-odd-color;
  }
}

.polygon {
  width: $size;
  height: $size;
  @include center;
    border:solid 1px black;
    border-radius:100%;
  .rect {
    background: $rect-even-color;
    transform-origin: center center;
    @include border;
    @include center;
  }
}

    .lists--odd{
        .polygon{
            .rect{
                border-top:none
            }
        }
    }
</style>