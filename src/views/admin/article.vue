<template>
    <div class="info">
        <div class="info-form form-mini form-center">
            <h1>完整demo</h1>
            <div id="editor"></div>
        </div>
        <div class="info-form form-mini form-center">
            <Button style="margin-top:100px;" type="info" @click="save">保存</Button>
        </div>
    </div>
</template>
<script>
    import Util from '../../libs/util';

    export default {
        data() {
            return {
                
            }
        },
        created() {
            setTimeout(function(){
                var ue = UE.getEditor('editor')
            },1000);
        },
        methods: {
            async save(){
                console.log(UE.getEditor('editor').getContent())
            }
        }
    };
</script>
<style socped>
.info{
    height:600px;
}
#editor{
    width:500px;
    height:400px;
}
</style>
