<template>
    <div class="layout">
        <Row class="content-layout" type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu active-name="setting" theme="dark" width="auto" :open-names="['1','5']" @on-select="toLink">
                    <div class="layout-logo-left" @click="toLink('setting')">MLSCGLXT</div>
                    <Submenu name="1" v-if="loginUser.type !== 0">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            系统设置
                        </template>
                        <Menu-item name="admin/info">基本设置</Menu-item>                
                    </Submenu>
                    <Submenu name="2" v-if="loginUser.type !== 0">
                        <template slot="title">
                            <Icon type="ios-people"></Icon>
                            用户管理
                        </template>
                        <Menu-item name="admin/user/create">添加用户</Menu-item>
                        <Menu-item name="admin/user/list">用户列表</Menu-item>
                        <Menu-item name="admin/user/relationship">用户关系</Menu-item>                                                
                    </Submenu>
                    <Submenu name="3" v-if="loginUser.type !== 0">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            资金
                        </template>
                        <Menu-item name="admin/withdrawals">提现管理</Menu-item>
                        <Menu-item name="admin/capital/log">资金记录</Menu-item>
                    </Submenu>
                    <Submenu name="4" v-if="loginUser.type !== 0">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            基金管理
                        </template>
                        <Menu-item name="admin/funds/log">基金记录</Menu-item>
                    </Submenu>
                    <Submenu name="5" v-if="loginUser.type === 0">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            系统设置
                        </template>
                        <Menu-item name="admin/order">上传订单</Menu-item>
                        <Menu-item name="admin/order/list">订单列表</Menu-item>                        

                        <Menu-item name="admin/cash">上传基金</Menu-item>
                        <Menu-item name="admin/cash/list">基金列表</Menu-item>
                        <Menu-item name="admin/create" v-if="loginUser.name === 'admin'">添加管理员</Menu-item>
                        <Menu-item name="admin/article" v-if="loginUser.name === 'admin'">发布文章</Menu-item>
                        <Menu-item name="admin/upgrade">升级列表</Menu-item>
                        <Menu-item name="admin/withdrawals/list">提现列表</Menu-item>
                        <Menu-item name="admin/log">操作记录</Menu-item>
                    </Submenu>
                </Menu>
                
                <div class="layout-copy">
                    2017 &copy; ruorongguoji.com
                </div>
            </i-col>
            <i-col span="19">
                <div class="layout-header">{{getTitle()}}</div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Util from '../libs/util';
    export default {
        data() {
            return {
                loginUser: {},
                title:''
            };
        },
        mounted() {
            this.getUser()
        },
        beforeDestroy() {

        },
        methods: {
            async getUser(){
                let data = await Util.post('admin/user/info');
                console.log('data')
                console.log(data)
                if(data.status == 0) {
                    this.toLink('login')
                    return;
                }
                this.loginUser = data.data
            },
            toLink(link){
                this.$router.push(`/${link}`)
            },
            getTitle(){
                return this.$store.getters.getTitle
            }
        }
    };
</script>

<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        height: 100%;
    }

    .content-layout {
        height: 100%;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        height: 100%;
        position: relative;
    }
    .layout-header{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 20px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 100%;
        height: 60px;
        line-height: 60px;
        color:#FFF;
        font-size: 18px;
        background: rgba(0,0,0,0.2);
        text-align: center;
    }
    .list-box .ivu-row .ivu-col{
        background:white;
    }
</style>
