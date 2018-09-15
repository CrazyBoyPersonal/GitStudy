<template>
    <div class="App-view">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>
<style>
    body {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
    }
    .App-view {
        position: relative;
        height: 100%;
    }
    .page-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form-mini {
        width: 500px;
    }
    .table-page {
        margin-top: 10px;
    }
    .form-center{
        margin:0 auto;
    }
</style>
