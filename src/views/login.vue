<template>
    <div class="index">
        <div class="login-form" v-on:keyup.enter="submit">
            <Form :model="form" :label-width="80" :rules="ruleValidate">
                <Form-item label="用户名" prop="username">
                    <Input v-model="form.username" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <Input type="password" v-model="form.password" placeholder="请输入"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="submit">登录</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    import Util from '../libs/util';

    export default {
        data() {
            return {
                form: {
                    username:'',
                    password:'',
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
        },
        methods: {
            async submit() {
                let loginData = await Util.post('admin/user/login',{name:this.form.username,password:this.form.password});
                console.log(loginData)
                if(loginData.status == 1){

                    Util.setCookie('id',loginData.data.id);
                    Util.setCookie('token',loginData.data.token);
                    
                    Util.success('登录成功');
                    this.$router.push('/admin');
                }
                else{
                    Util.error('账号或者密码错误');
                }
            }
        }
    };
</script>

<style socped>
    .login-form {
        width: 240px;
        text-align: right;
    }
    .index {
        height: 100%;
        width: 100%;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .index h1 {
        height: 150px;
    }

    .index h1 img {
        height: 100%;
    }

    .index h2 {
        color: #666;
        margin-bottom: 200px;
    }

    .index h2 p {
        margin: 0 0 50px;
    }

    .index .ivu-row-flex {
        height: 100%;
    }
</style>
