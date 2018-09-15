<template>
    <div class="list">
        <div class="list-box">
            <Row>
                <Col span="1">编号</Col>        
                <Col span="2">申请者</Col>        
                <Col span="3">申请凭证</Col>        
                <Col span="3">申请时间</Col>        
                <Col span="3">操作时间</Col>        
                <Col span="3">当前等级</Col>        
                <Col span="3">升级后等级</Col>        
                <Col span="6">操作</Col>        
            </Row>

            <Row v-for="(item,index) in listData">
                <Col span="1">{{item.id}}</Col>        
                <Col span="2">{{item.apply_id}}</Col>        
                <Col span="3">{{'申请凭证'}}</Col>        
                <Col span="3">{{item.apply_time}}</Col>        
                <Col span="3">{{item.last_time}}</Col>        
                <Col span="3">{{typeList[item.current_type]}}</Col>        
                <Col span="3">{{typeList[item.type]}}</Col>        
                <Col span="6">
                    <div v-if="item.status == 0">
                        <Button type="info" @click="promote(item.id)">升级</Button>
                        <Button type="warning" @click="reject(item.id)">驳回</Button>
                    </div>
                    <div v-if="item.status == 1">
                        审核通过
                    </div>
                    
                    <div v-if="item.status == 2">
                        驳回
                    </div>
                </Col>     
            </Row>

            <Row>
                <Col span="15">提现列表</Col>                            
                <Col span="3"><Button type="info" @click="provPage">上一页</Button></Col>     
                <Col span="3">{{page}}</Col>        
                <Col span="3"><Button type="info" @click="nextPage">下一页</Button></Col>        
            </Row>
        </div>
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
                typeList:['','运营中心','分公司','客户经理','客户']
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
                let tempData = await Util.post('admin/jurisdiction/list',{
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
            },
            async promote (index){
                let tempData = await Util.post('admin/jurisdiction/update',{
                    id:index,
                    status:1
                });
                this.getUserData();
                Util.success('操作成功');
            },
            async reject (index){
                let tempData = await Util.post('admin/jurisdiction/update',{
                    id:index,
                    status:2
                });
                this.getUserData();
                Util.success('操作成功')
            },
        }
    };
</script>

<style socped>
</style>
