<template>
    <div class="withdrawals">
        <div class="info-form form-mini form-center">
            <Input v-model="name" disabled>
                <span slot="prepend">姓名</span>
            </Input>
            <br/>
            <Input v-model="money" disabled>
                <span slot="prepend">余额</span>
            </Input>
            <br/>
            <Input v-model="card">
                <span slot="prepend">银行卡</span>
            </Input>
            <br/>
            <Input v-model="bank">
                <span slot="prepend">开户行</span>
            </Input>

            <br/>
            <Button type="primary" @click="submit">保存</Button>
            <br/>
            <br/>
            <p>注: 每周三发放上一周获得的奖金</p>
        </div>
    </div>
</template>
<script>
    import Util from '../../libs/util';

    export default {
        data() {
            return {
                name:null,
                card: null,
                money:null,
                bank:null
            }
        },
        created() {
           this.getUserData();
        },
        methods: {
            async getUserData(){
                let infoData = await Util.post('admin/user/info');
                if(infoData.status == 1){
                    this.money = infoData.data.money
                    this.name = infoData.data.name
                    this.card = infoData.data.card
                    this.bank = infoData.data.bank
                }
            },
            async submit() {
                if(this.card == null || this.card == '' || this.bank == null || this.bank == ''){
                    Util.error('请填写相关信息');   
                }
                else{
                    let insertData = await Util.post('admin/user/updata',{
                        card:this.card,
                        bank:this.bank
                    });
                    console.log(insertData)
                    if(insertData.status == 1){
                        Util.success(insertData.message);
                    }
                    else{
                        Util.error(insertData.message);                    
                    }
                    this.getUserData();
                }
            }
        }
    };
</script>

<style socped>
</style>
