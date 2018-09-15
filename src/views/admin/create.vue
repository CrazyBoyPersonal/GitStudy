<template>
    <div class="create">
        <div class="info-form form-mini form-center" v-on:keyup.enter="save">
            <Form class="table-page" :model="form" :label-width="80" :rules="ruleValidate">
                <Form-item label="姓名" prop="name">
                    <Input v-model="form.name"  placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="身份证" prop="idcard">
                    <Input v-model="form.idcard" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="手机号" prop="phone">
                    <Input v-model="form.phone" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <Input type="password" v-model="form.password" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="确认密码" prop="againPassword">
                    <Input type="password" v-model="form.againPassword" placeholder="请输入"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="save">保存</Button>
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
                    name:null,
                    idcard:null,
                    phone:null,
                    password:null,
                    againPassword:null
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],idcard: [
                        { required: true, message: '身份证不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    againPassword:[
                        { required: true, message: '确认密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
        },
        methods: {
            async save(){
                let form = this.form;
                if(form.name && form.idcard && form.phone && form.password && form.againPassword){
                    if(form.password == form.againPassword){
                        let m = await Util.post('admin/user/create',{
                            name:form.name,
                            idcard:form.idcard,
                            phone:form.phone,
                            password:form.password,
                            type:4
                        })
                        Util.success('创建用户成功');
                        this.form = {
                            name:null,
                            idcard:null,
                            phone:null,
                            password:null,
                            againPassword:null
                        }
                    }
                    else{
                        Util.error('密码不一致');
                    }
                }
                else{
                    Util.error('请填写完毕');
                }
            }
        }
    };
</script>

<style socped>
</style>
