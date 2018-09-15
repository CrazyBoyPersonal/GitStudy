const routers = [{
    path: '/',
    meta: {
        title: '登录'
    },
    redirect: '/login'
},{
    path: '/login',
    meta: {
        title: '登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
},{
    path:'/admin/',
    meta:{
        title:''
    },
    component: (resolve) => require(['./views/admin.vue'], resolve),
    children:[
        {
            path: '/admin/info',
            meta: {
                title: '基本资料'
            },
            component: (resolve) => require(['./views/admin/info.vue'], resolve)
        },
        {
            path: '/admin/upgrade',
            meta: {
                title: '升级列表'
            },
            component: (resolve) => require(['./views/admin/upgrade.vue'], resolve)
        },
        {
            path: '/admin/withdrawals',
            meta: {
                title: '提现管理'
            },
            component: (resolve) => require(['./views/admin/withdrawals.vue'], resolve)
        },
        {
            path: '/admin/withdrawals/list',
            meta: {
                title: '提现列表'
            },
            component: (resolve) => require(['./views/admin/withdrawals-list.vue'], resolve)
        },
        {
            path: '/admin/cash/list',
            meta: {
                title: '基金列表'
            },
            component: (resolve) => require(['./views/admin/cash-list.vue'], resolve)
        },
        {
            path: '/admin/order',
            meta: {
                title: '上传订单'
            },
            component: (resolve) => require(['./views/admin/order.vue'], resolve)
        },
        {
            path: '/admin/order/list',
            meta: {
                title: '订单列表'
            },
            component: (resolve) => require(['./views/admin/order-list.vue'], resolve)
        },
        {
            path: '/admin/user/create',
            meta: {
                title: '添加用户'
            },
            component: (resolve) => require(['./views/admin/create.vue'], resolve)
        },{
            path: '/admin/user/list',
            meta: {
                title: '用户列表'
            },
            component: (resolve) => require(['./views/admin/list.vue'], resolve)
        },{
            path: '/admin/funds/cash',
            meta: {
                title: '基金消费'
            },
            component: (resolve) => require(['./views/admin/cash.vue'], resolve)
        },
        {
            path: '/admin/user/relationship',
            meta: {
                title: '用户关系'
            },
            component: (resolve) => require(['./views/admin/relationship.vue'], resolve)
        },
        {
            path: '/admin/cash',
            meta: {
                title: '上传基金'
            },
            component: (resolve) => require(['./views/admin/cash.vue'], resolve)
        },
        
        {
            path: '/admin/create',
            meta: {
                title: '创建管理员账号'
            },
            component: (resolve) => require(['./views/admin/admin-create.vue'], resolve)
        },{
            path: '/admin/log',
            meta: {
                title: '操作记录'
            },
            component: (resolve) => require(['./views/admin/log.vue'], resolve)
        },{
            path: '/admin/capital/log',
            meta: {
                title: '资金记录'
            },
            component: (resolve) => require(['./views/admin/capital-log.vue'], resolve)
        },{
            path: '/admin/funds/log',
            meta: {
                title: '基金记录'
            },
            component: (resolve) => require(['./views/admin/funds-log.vue'], resolve)
        },{
            path: '/admin/article',
            meta: {
                title: '发布文章'
            },
            component: (resolve) => require(['./views/admin/article.vue'], resolve)
        },
        
        {
            path: '/admin/*',
            meta: {
                title: '欢迎'
            },
            component: (resolve) => require(['./views/admin/defualt.vue'], resolve)
        }
    ]
}];
export default routers;
