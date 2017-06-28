import axios from 'axios'
import qs from 'qs'
import {setStore,getStore} from '../util/mutils'
// import config from './config'

import * as _ from '../util/tool'

function http(api, params,callback) {
    params = params || {};
    callback =  typeof(callback)=='function'? callback : function(res){};
    var json = {
        "CLIENT_OS": "WXAPP",
        "CLIENT_API" : "CUSTOM",
        "WX_OPENID" : '',
        "API" : api,
        "TOKEN" :'',
        "LNG" : '',
        "LAT" : '',
        "data" :JSON.stringify(params),
    };
    let config={
        headers:{'content-type':'application/x-www-form-urlencoded'},
        method : "post",
        baseURL:'/'
    }
    var postdata = [];
    for(var k in json){
        postdata.push(k+"="+json[k]);
    }
    axios.post('/api/api.php',postdata.join("&"))
       .then((res) => {
            if(res.data.error == "101"){
                
            }else if(res.data.error==0){
                // console.log(res)
                callback(res.data);
            }else{
                console.log(res.data.message)
            }
        },(err) => {
            console.log('请求失败!!!!!')
        })
}


export default {
    index(params,callback) {
        return http('client/wmclient/index/index', params,callback)
    },
    shoplist(params,callback) {
        return http('client/wmclient/shop/shoplist', params,callback)
    },
    getfilter(params,callback) {
        return http('client/wmclient/shop/cate', params,callback)
    },
    shopdetail(params,callback) {
        return http('client/wmclient/shop/detail', params,callback)
    },
    comments(params,callback) {
        return http('client/wmclient/shop/comments', params,callback)
    },
    dianpudetail(params,callback) {
        return http('client/wmclient/shop/info', params,callback)
    },

}
