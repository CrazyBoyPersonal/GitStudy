<template>
    <div class="withdrawals">
        <div class="info-form form-mini form-center">
            用户名：<br/>
            <Col span="12" style="padding-right:10px">
                <Select v-model="userSelect" filterable>
                    <Option v-for="(item,index) in userList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </Col>
            
            <br/><br/><br/>
            <Input v-model="address">
                <span slot="prepend">地点</span>
            </Input>
            <br/>

            <Upload 
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-success="onSuccessFunction"
                :on-preview="onPreviewFunction"
                :on-remove="onRemoveFunction"
                action="http://localhost:3000/upload/images">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <br/>

            <Input v-model="money">
                <span slot="prepend">金额</span>
            </Input>
            <br/>

            <Input v-model="cost">
                <span slot="prepend">成本</span>
            </Input>
            <br/>

            <Button type="primary" @click="submit">提交</Button>
        </div>

        <Modal title="查看图片" v-model="lookBox.visible">
            <img :src="'http://localhost:3000/upload/' + lookBox.path " v-if="lookBox.visible" style="width: 100%">
        </Modal>

    </div>

    

</template>
<script>
    import Util from '../../libs/util';

    export default {
        data() {
            return {
                address:null,
                money:null,
                cost:null,
                phone:null,
                userList: [],
                userSelect: '',
                imagePath:[],
                lookBox:{
                    visible:false,
                    path:''
                }
            }
        },
        created() {
           this.getUserData();
        },
        methods: {
            async onSuccessFunction (file) {
                if(file.status == 1){
                    this.imagePath.push(file.path);
                    Util.success('上传成功');
                }
                else{
                    Util.error('上传失败');
                }
            },
            async onPreviewFunction (file){
                let path = file.response.path;

                console.log(path)
                this.lookBox = {
                    visible:true,
                    path:path
                }
                
            },
            async onRemoveFunction(file){
                for(let i = 0 ; i < this.imagePath.length;i++){
                    if(this.imagePath[i] == file.response.path){
                        this.imagePath.splice(i,1);
                        break;
                    }
                }
            },
            async getUserData(){
                let infoData = await Util.post('admin/user/info');
                if(infoData.status == 1){
                    this.id = infoData.data.id
                }

                let tempData = await Util.post('admin/user/list');
                for(let i = 0 ; i < tempData.count ; i++){
                    this.userList.push({
                        value:tempData.data[i].id,
                        label:tempData.data[i].name
                    })
                }
                console.log(tempData.count)
            },
            async submit() {
                if(this.userSelect == '' || this.userSelect == null || this.address == null || this.address == '' || this.money == null || this.cost == '' || this.imagePath.length == 0){
                    Util.error('请填写相关信息');   
                }
                else{
                    let createData = await Util.post('admin/consumption/create',{
                        id:this.userSelect,
                        money:this.money,
                        cost:this.cost,
                        address:this.address,
                        imagePath:this.imagePath
                    })
                    if(createData.status == 1){
                        Util.success(createData.message)
                    }
                    else{
                        Util.error(createData.message)
                    }
                }
            }
        }
    };
</script>

<style socped>
    .withdrawals{
        width:100%;
        height:100%;
    }
</style>
