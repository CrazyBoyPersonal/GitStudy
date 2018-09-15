import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);



// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title,store);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



const store = new Vuex.Store({
    state: {
        pageTitle:''
    },
    getters: {
        getTitle: state => {
            return state.pageTitle
        },
    },
    mutations: {
        setTitle(state, title) {
            state.pageTitle = title
        },
    },
    actions: {

    }
});


let vue = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});

export default vue;
