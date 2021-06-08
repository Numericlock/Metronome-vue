<template>
    <div class="dragbar"></div>
    <router-view />
</template>
<style lang="scss">
    body {
        overflow: hidden;
    }
    .dragbar{
        height:20px;
        width:100%;
        -webkit-app-region: drag;
        -webkit-user-select: none;
        background: rgba(62, 62, 62, 0.80);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>