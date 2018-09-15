<template>
    <div class="list">
        <div class="list-box">
            <Row>
                <Col span="1">编号</Col>        
                <Col span="2">申请者</Col>      
                <Col span="3">汇总时间</Col>        
                <Col span="3">操作时间</Col>        
                <Col span="6">提现账号</Col>  
                <Col span="3">提现金额</Col>        
                <Col span="6">操作</Col>        
            </Row>

            <Row v-for="(item,index) in listData">
                <Col span="1">{{item.id}}</Col>        
                <Col span="2">{{item.user_id}}</Col>        
                <Col span="3">{{item.apply_time}}</Col>        
                <Col span="3">{{item.last_time}}</Col>        
                <Col span="6">{{item.mode == 0 ? '支付宝:' + item.bank :'银行卡:' + item.card + '(' + item.bank + ')'}}</Col>         
                <Col span="3">{{item.money}}</Col>        
                <Col span="6">
                    <div v-if="item.status == 0">
                        <a v-if="item.card == null || item.bank == null">
                            <Button type="info" @click="promote(item.id)">确认</Button>
                        </a>
                        <Button type="warning" @click="rejectVerification(item.id)">驳回</Button>
                    </div>
                    <div v-if="item.status == 1">
                        已经打款
                    </div>
                    
                    <div v-if="item.status == 2">
                        驳回
                    </div>
                </Col>     
            </Row>

            <Row>
                <Col span="15">奖金列表</Col>                            
                <Col span="3"><Button type="info" @click="provPage">上一页</Button></Col>     
                <Col span="3">{{page}}</Col>        
                <Col span="3"><Button type="info" @click="nextPage">下一页</Button></Col>        
            </Row>
        </div>
        <Modal
            v-model="messageBox.visible"
            title="系统提示"
            @on-ok="messageBoxOk">
            <p>请输入驳回的理由</p>
            <Input v-model="messageBox.value" placeholder="请输入..."></Input>
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
                messageBox:{
                    id:null,
                    visible:false,
                    value:''
                }
            }
        },
        created() {
            this.getUserData();
        },
        methods: {
            async rejectVerification(id){
                this.messageBox.id = id;
                this.messageBox.visible = true;
                this.messageBox.value = ''
            },
            async messageBoxOk(){
                if(this.messageBox.value == null || this.messageBox.value == ''){
                    Util.error('请输入驳回理由');
                }
                else{
                    this.reject(this.messageBox.id);
                }
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
                let tempData = await Util.post('admin/withdrawals/list',{
                    page:this.page,
                    limit:this.limit
                });

                this.count = tempData.count;

                tempData = tempData.data;

                for(let i = 0 ; i < tempData.length ; i++){
                    tempData[i].apply_time = moment(tempData[i].apply_time).format('YYYY-MM-DD');
                    tempData[i].last_time = moment(tempData[i].last_time).format('YYYY-MM-DD');
                }
                this.listData = tempData;
                console.log(tempData);
            },
            async promote (index){
                let tempData = await Util.post('admin/withdrawals/update',{
                    id:index,
                    status:1
                });
                this.getUserData();
                Util.success('操作成功');
            },
            async reject (index){
                let tempData = await Util.post('admin/withdrawals/update',{
                    id:index,
                    status:2,
                    message:this.messageBox.value
                });
                this.getUserData();
                Util.success('操作成功')
            },
        }
    };
</script>

<style socped>

</style>
