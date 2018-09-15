<template>
    <div class="create">
        <Tree :data="baseData" on-select-change="t"></Tree>
    </div>
</template>
<script>
    
    import Util from '../../libs/util';
    import jq from 'jquery';

    export default {
        data() {
            return {
                userData:null,
                baseData: [{
                    title: '',
                    children: []
                }],
                ergodicList:null,
                TempData:{
                    data:[{
                        name:'admin',
                        top_id:0,
                        data:[]
                    }]
                },
            }
        },
        created() {
            this.getUserData();
        },
        methods: {
            async getUserData (){
                // this.userData = await Util.post('admin/user/list');
                this.userData = {
                    count:3,
                    data:[{
                        top_id:0,
                        id:10001,
                        name:'10001'
                    },
                    {
                        top_id:10001,
                        id:10002,
                        name:'10002'
                    },
                    {
                        top_id:10002,
                        id:10003,
                        name:'10003'
                    }]
                };
                let top_id = Util.getCookie('id');

                for(let i = 0 ; i < this.userData.count ; i++){
                    
                    this.ergodicList = this.userData.data[i];

                    this.ergodic(this.TempData);

                }

                console.log(this.TempData)
            },
            async ergodic(tempData){
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                if(typeof tempData.data === 'undefined'){
                    return;
                }
                else{
                    console.log(tempData.data.length)
                    for(let i = 0 ; i < tempData.data.length ; i++){
                        console.log(tempData.data[i].id == this.ergodicList.top_id)
                        if(tempData.data[i].top_id == this.ergodicList.top_id){
                            tempData.data[i].data.push({
                                id:this.ergodicList.id,
                                top_id:this.ergodicList.top_id,
                                name:this.ergodicList.name,
                                data:[]
                            })
                            return;
                        }
                        console.log(typeof tempData.data[i].data == typeof [] && tempData.data[i].data != null);
                        
                        if(typeof tempData.data[i].data == typeof [] && tempData.data[i].data != null){
                            console.log(tempData.data[i].data);
                            this.ergodic(tempData.data[i].data);
                        }
                    }
                }
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            }
            
        }
    };
</script>
<style socped>
</style>
