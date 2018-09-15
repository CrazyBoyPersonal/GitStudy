import vue from '../main';
import Routers from '../router';
import iView from 'iview';
import axios from 'axios';
import env from '../config/env';
import moment from 'moment';
import crypto from 'crypto';
moment.locale('zh-cn');

let util = {

};
util.title = function(title,store) {
    store.commit('setTitle', title)
    title = title ? title + ' - 控制中心' : '控制中心';
    window.document.title = title;
};

const ajaxUrl = 'http://127.0.0.1:3000';

util.url = ajaxUrl;
util.headers = () => {
    return {
        'id':util.getCookie('id'),
        'token':util.getCookie('token')
    };
}

util.post = (url,data) => {
    data = data || {}
    return axios.create({
        baseURL: ajaxUrl,
        timeout: 30000
    }).post(url,data,{
        headers: {
            'content-type': 'application/json',
            'id':util.getCookie('id') || 0,
            'token':util.getCookie('token') || '0'
        }
    }).then(res => {
        if(res.data.status == -1) vue.$router.push('/login')
        
        return res.data;
    })
}
util.success = (desc,title = '系统提示') => {
    iView.Notice.success({
        title: title,
        desc: desc
    });
}
util.error = (desc,title = '系统提示') => {
    iView.Notice.error({
        title: title,
        desc: desc
    });
}
util.setCookie = (name, value) => {
    let Days = 1;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
util.getCookie = (name) => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null
}
util.delCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
util.time = (unix) => {
    return moment(unix*1000).format('l LTS')
}
util.datetype = (unix) => {
    return moment(unix*1000).format()
}
util.sha256 = (data) => {
    return crypto.createHash('sha256').update(String(data)).digest('hex');
}
export default util;
