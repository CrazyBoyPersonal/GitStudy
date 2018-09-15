<template>
    <div class="list">
        <div class="list-box">
            <Row>
                <Col span="2">编号</Col>        
                <Col span="3">申请者</Col>      
                <Col span="6">创建时间</Col>        
                <Col span="6">操作时间</Col>   
                <Col span="4">基金</Col>        
                <Col span="3">操作</Col>        
            </Row>

            <Row v-for="(item,index) in listData">
                <Col span="2">{{item.id}}</Col>        
                <Col span="3">{{item.user_id}}</Col>        
                <Col span="6">{{item.apply_time}}</Col>        
                <Col span="6">{{item.last_time}}</Col>           
                <Col span="4">{{item.money}}</Col>        
                <Col span="3">
                    <div v-if="item.type == 0">
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
                <Col span="15">基金列表</Col>                            
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
                count:0
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
                let tempData = await Util.post('admin/cash/list',{
                    page:this.page,
                    limit:this.limit
                });

                this.count = tempData.count;

                tempData = tempData.data;
                
                for(let i = 0 ; i < tempData.length ; i++){
                    tempData[i].apply_time = moment(tempData[i].apply_time).format('YYYY-MM-DD hh:mm:ss');
                    tempData[i].last_time = moment(tempData[i].last_time).format('YYYY-MM-DD hh:mm:ss');
                }
                this.listData = tempData;
                console.log(tempData)
            },
            async promote (index){
                let tempData = await Util.post('admin/fund/update',{
                    id:index,
                    type:1
                });
                this.getUserData();
                Util.success('操作成功');
            },
            async reject (index){
                let tempData = await Util.post('admin/fund/update',{
                    id:index,
                    type:2
                });
                this.getUserData();
                Util.success('操作成功')
            },
        }
    };
</script>

<style socped>
</style>
