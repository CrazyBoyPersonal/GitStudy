<template>
    <div class="list">
        <div class="list-box">
            <Row>
                <Col span="3">编号</Col>
                <Col span="3">操作者</Col>
                <Col span="12">操作内容</Col>
                <Col span="6">操作时间</Col>           
            </Row>

            <Row v-for="(item,index) in userData">
                <Col span="3">{{item.id}}</Col>
                <Col span="3">{{item.user_id}}</Col>
                <Col span="12">{{item.message}}</Col>
                <Col span="6">{{item.time}}</Col>            
            </Row>

            <Row>
                <Col span="15">升级列表</Col>                            
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
                userData:[],
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
            async getUserData(){
                let tempData = await Util.post('admin/message/list',{
                    page:this.page,
                    limit:this.limit
                });
                this.count = tempData.count;
                console.log(tempData)
                for(let i = 0 ; i < tempData.count ; i++){
                    tempData.data[i].time = moment(tempData.data[i].status).format('YYYY-MM-DD hh:mm:ss');
                    this.userData.push(tempData.data[i])
                }
            }
        }
    };
</script>

<style socped>
</style>
