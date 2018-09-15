<template>
    <div class="info">
        <div class="info-form form-mini form-center" v-on:keyup.enter="save">
            <Form class="table-page" :model="form" :label-width="80" :rules="ruleValidate">
                <Form-item label="编号" prop="id">
                    <Input v-model="form.id" disabled  placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="姓名" prop="name">
                    <Input v-model="form.name" disabled  placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="身份证" prop="idcard">
                    <Input v-model="form.idcard" disabled  placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="余额" prop="money">
                    <Input v-model="form.money" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="基金" prop="fund">
                    <Input v-model="form.fund" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="手机号" prop="phone">
                    <Input v-model="form.phone" placeholder="请输入"></Input>
                </Form-item>

                <Form-item label="密码" prop="password">
                    <Input v-model="form.password" placeholder="请输入"></Input>
                </Form-item>

                <Form-item label="确认密码" prop="againPassword">
                    <Input v-model="form.againPassword" placeholder="请输入"></Input>
                </Form-item>

                <Form-item>
                    <Button type="primary" @click="save">保存</Button>
                    
                    
                </Form-item>

                <Form-item v-if="form.allow_type < form.type">
                    <Button type="primary" @click="upgrade">升级 为 {{typeList[form.allow_type]}}</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    import Util from '../../libs/util';

    export default {
        data() {
            return {
                form: {
                    id:'',
                    name:'',
                    idcard:'',
                    phone:'',
                    password:'',
                    againPassword:'',
                    type:4,
                    allow_type:4,
                    money:0,
                    fund:0,
                },
                typeList:['终端','运营中心','分公司','客户经理','客户'],
                ruleValidate: {
                    phone: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            async getInfo(){
                let infoData = await Util.post('admin/user/info');
                if(infoData.status == 1){
                    this.form = {
                        id:infoData.data.id,
                        name:infoData.data.name,
                        idcard:infoData.data.idcard,
                        phone:infoData.data.phone,
                        againPassword:infoData.data.againPassword,
                        money:infoData.data.money,
                        fund:infoData.data.fund,
                        type:infoData.data.type,
                        allow_type:infoData.data.allow_type
                    }
                    console.log(this.form)
                }
                
            },
            async save() {
                if(this.form.password != this.form.againPassword){
                    Util.error('密码与确认密码不相符');
                }
                else if(this.form.password == this.form.againPassword && this.form.password !=''){
                    console.log(1)
                    let updateData = await Util.post('admin/user/updata',{
                        id:this.form.id,
                        phone:this.form.phone,
                        password:this.form.password,
                        phone:this.form.phone
                    });

                    if(updateData.status == 1){
                        Util.success(updateData.message)
                    }
                    else{
                        Util.error(updateData.message)
                    }
                }
                else{
                    console.log(2)
                    
                    let updateData = await Util.post('admin/user/updata',{
                        id:this.form.id,
                        phone:this.form.phone
                    });

                    if(updateData.status == 1){
                        Util.success(updateData.message)
                    }
                    else{
                        Util.error(updateData.message)
                    }
                }
            },
            async upgrade(){
                let upgradeData = await Util.post('admin/jurisdiction/create',{
                    id:this.form.id,
                    image_path:'',
                    type:this.form.allow_type
                })
                if(upgradeData.status == 1){
                    Util.success(upgradeData.message);
                }
                else{
                    Util.error(upgradeData.message);
                }
            }
        }
    };
</script>

<style socped>
</style>
