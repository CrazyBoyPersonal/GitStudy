<template>
    <div class="list">
        <div class="list-box">
            <Row>
                <Col span="1">编号</Col>        
                <Col span="2">申请者</Col>      
                <Col span="6">创建时间</Col>        
                <Col span="6">凭证信息</Col>     
                <Col span="3">金额</Col>        
                <Col span="2">成本</Col>        
                <Col span="4">操作</Col>        
            </Row>

            <Row v-for="(item,index) in listData">
                <Col span="1">{{item.id}}</Col>        
                <Col span="2">{{item.user_id}}</Col>        
                <Col span="6">{{item.time}}</Col>        
                <Col span="6">
                    <a v-for="(item,i) in item.image_list" @click="showImage(item)">{{' [' + i + '] '}}</a>
                </Col>        
                <Col span="3">{{item.money}}</Col>        
                <Col span="2">{{item.cost}}</Col>        
                <Col span="4">
                    <div v-if="item.status == 0">
                        <Button type="info" @click="promote(item.id)">确认</Button>
                        <Button type="warning" @click="reject(item.id)">驳回</Button>
                    </div>
                    <div v-if="item.status == 1">
                        已经发放
                    </div>
                    
                    <div v-if="item.status == 2">
                        驳回
                    </div>
                </Col>     
            </Row>

            <Row>
                <Col span="15">订单列表</Col>                            
                <Col span="3"><Button type="info" @click="provPage">上一页</Button></Col>     
                <Col span="3">{{page}}</Col>        
                <Col span="3"><Button type="info" @click="nextPage">下一页</Button></Col>        
            </Row>
        </div>
        <Modal title="查看图片" v-model="lookBox.visible">
            <img :src="'http://localhost:3000/upload/' + lookBox.path " v-if="lookBox.visible" style="width: 100%">
        </Modal>
    </div>
    
</template>
<script>
    import Util from '../../libs/util';
    import moment from 'moment';

    export default {
        data() {
            return {
                listData:null,
                page:1,
                limit:8,
                count:0,
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
            async showImage(path){
                this.lookBox.visible = true;
                this.lookBox.path = path;
            },
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
                let tempData = await Util.post('admin/consumption/list',{
                    page:this.page,
                    limit:this.limit
                });

                this.count = tempData.count;

                tempData = tempData.data;
                
                for(let i = 0 ; i < tempData.length ; i++){
                    console.log(tempData[i].image_list);
                    tempData[i].time = moment(tempData[i].time).format('YYYY-MM-DD hh:mm:ss');
                    tempData[i].audited_time = moment(tempData[i].audited_time).format('YYYY-MM-DD hh:mm:ss');
                }

                this.listData = tempData;
                console.log(tempData)
            },
            async promote (index){
                let auditedData = await Util.post('admin/consumption/audited',{id:index})
                if(auditedData.status == 1){
                    Util.success(auditedData.message)
                }
                else{
                    Util.error(auditedData.message)
                }
                this.getUserData();
            },
            async reject (index){
                let auditedData = await Util.post('admin/consumption/reject',{id:index})
                if(auditedData.status == 1){
                    Util.success(auditedData.message)
                }
                else{
                    Util.error(auditedData.message)
                }
                this.getUserData();
            },
        }
    };
</script>

<style socped>
</style>
