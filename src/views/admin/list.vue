<template>
    <div class="list">
        <div class="list-box" v-if="credentials.status == 0">
            <Row>
                <Col span="3">编号</Col>
                <Col span="5">用户名</Col>
                <Col span="6">身份证</Col>
                <Col span="4">手机号</Col>
                <Col span="3">余额</Col>
                <Col span="3">类型</Col>           
            </Row>

            <Row v-for="(item,index) in userData">
                <Col span="3">{{item.id}}</Col>
                <Col span="5">{{item.name}}</Col>
                <Col span="6">{{item.idcard}}</Col>
                <Col span="4">{{item.phone}}</Col>
                <Col span="3">{{item.money}}</Col>
                <Col span="3">{{item.type}}</Col>              
            </Row>

            <Row>
                <Col span="15">升级列表</Col>                            
                <Col span="3"><Button type="info" @click="provPage">上一页</Button></Col>     
                <Col span="3">{{page}}</Col>        
                <Col span="3"><Button type="info" @click="nextPage">下一页</Button></Col>        
            </Row>
        </div>
        <div class="submit-credentials info-form form-mini form-center" v-if="credentials.status == 1">

            <Button type="primary" @click="back">
                <Icon type="chevron-left"></Icon>
                后退
            </Button><br/><br/>

            <Input v-model="credentials.id" disabled>
                <span slot="prepend">编号</span>
            </Input><br/>
            <Select v-model="typeSelect" style="width:200px">
                <Option v-for="item in typeList" :value="item.value" :key="item">{{ item.name }}</Option>
            </Select>
            <br/>
            <br/>

            <Button type="info" @click="submit">提交</Button>
        </div>
    </div>
    
</template>
<script>
    import Util from '../../libs/util';

    export default {
        data() {
            return {
                userData:[],
                page:1,
                limit:8,
                count:0,
                credentials:{
                    status:0,
                    id:null
                },
                typeList: [
                    {
                        value:'3',
                        name:'客户经理'
                    },{
                        value:'2',
                        name:'分公司'
                    },
                    {
                        value:'1',
                        name:'运营中心'
                    }
                ],
                typeSelect: '',
                typeList:['终端','运营中心','分公司','客户经理','客户']
            }
        },
        created() {
            this.getUserData();
        },
        methods: {
            async provPage(){
                if(this.page == 1){
                    Util.error('这是第一页');
                }
                else{
                    this.page--;
                    this.getUserData();
                }
            },
            async nextPage(){
                if(this.count / this.limit - this.page > 0){
                    this.page++;
                    this.getUserData();
                }
                else{
                    Util.error('这是最后一页');
                }
            },
            async getUserData (){
                let tempData = await Util.post('admin/user/list');
                this.count = tempData.count;
                let top_id = Util.getCookie('id');
                for(let i = 0 ; i < tempData.count ; i++){
                    if(tempData.data[i].top_id == top_id){
                        tempData.data[i].type = this.typeList[tempData.data[i].type];
                        this.userData.push(tempData.data[i])
                    }
                }
            },
            async back(){
                this.credentials.status = 0;                
            },
            async credentialsBox(index){
                this.credentials.status = 1;
                this.credentials.id = this.userData[index].id;
            },
            async submit(){
                let tempData = await Util.post('admin/jurisdiction/create',{
                    id:this.credentials.id,
                    image_path:'image_path',
                    type:this.typeSelect
                });

                if(tempData.status == 1){
                    Util.success(tempData.message)
                }
                else{
                    Util.error(tempData.message)
                }
            }
        }
    };
</script>

<style socped>
</style>
