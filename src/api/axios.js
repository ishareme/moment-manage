import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

//设置全局axios默认值
// axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888',
});
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

//request拦截器
instance.interceptors.request.use(
    config => {
        //每次发送请求之前检测本地是否存有token,都要放在请求头发送给服务器
        if(localStorage.getItem('token')){
            if (config.url.indexOf('upload-z0.qiniup.com/putb64') > -1){
                config.headers.Authorization = config.headers['UpToken'];
            }
            else {
                config.headers.Authorization = `token ${localStorage.getItem('token')}`.replace(/(^\")|(\"$)/g, '');
            }
        }
        console.log('config',config)
        return config;
    },
    err => {
        console.log('err',err)
        return Promise.reject(err);
    }
);
//response拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if(error.response){
            switch(error.response.status){
                case 401:
                    console.log(error.response)
                    store.dispatch('ADMIN_LOGINOUT'); //可能是token过期，清除它
                    router.replace({ //跳转到登录页面
                        path: '/login',
                        query: { redirect: '/dashboard' } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response);
    }
);

export default {
    /*
    * 七牛上传 接口
    * */
    //获取上传uploadToken
    getUploadToken(){
        return instance.get('/api/uploadToken');
    },
    //根据获取到的上传凭证uploadToken上传文件到指定域
    uploadFile(formdata, domain = 'https://upload-z0.qiniup.com', config = {headers: {'Content-Type': 'multipart/form-data'}}){
        console.log(domain)
        console.log(formdata)
        return instance.post(domain, formdata, config)
    },
    //根据获取到的上传凭证uploadToken上传base64到指定域
    uploadBase64File(base64, token, domain = 'https://upload-z0.qiniup.com/putb64/-1', config = {
        headers: {
            'Content-Type': 'application/octet-stream',
        },
    }){
        const pic = base64.split(',')[1];
        config.headers['UpToken'] = `UpToken ${token}`
        return instance.post(domain, pic, config)
    },

    /*
    * 网易云音乐 接口
    * */
    searchMusic(data){
        return instance.get(`/api/searchMusic`, {
            params: {
                key: data,
                limit: 5,
                page: 1,
            }
        });
    },

    /*
    * 获取验证码
    * */
    getCaptcha(){
        return instance.get(`/api/getCaptcha`);
    },

    /*
    * admin 接口
    * */
    //管理员登录
    adminLogin(data){
        return instance.post('/api/adminLogin', data);
    },
    //管理员注册
    adminRegister(data){
        return instance.post('/api/adminRegister', data);
    },
    //退出登录
    adminLoginOut(){

    },
    //获取管理员信息
    getAdminInfo(data){
        return instance.get(`/api/getAdminInfo?_id=${data}`);
    },
    //获取管理员列表
    getAdminList(data){
        return instance.get(`/api/getAdminList`, {
            params: data
        });
    },
    //修改管理员密码
    modifyAdminPassword(data){
        return instance.post(`/api/modifyAdminPassword`, data)
    },
    //修改管理员管理员(自己)的信息
    modifyAdminProfile(data){
        return instance.post(`/api/modifyAdminProfile`, data)
    },
    //更新其他管理员信息
    updateAdminInfo(data){
        return instance.post(`/api/updateAdminInfo`, data)
    },
    //添加管理员
    addAdmin(data){
        return instance.post(`/api/addAdmin`, data);
    },
    //获取所有管理员的type信息
    getAllAdmin(type){
        return instance.get(`/api/getAllAdmin`, {
            params: {
                type: type,
            }
        })
    },

    /*
    * user 接口
    * */
    //获取所有用户列表
    getUserList(data){
        return instance.get(`/api/getUserList`, {
            params: data
        });
    },
    //更新用户状态
    updateUserEnable(data){
        return instance.post(`/api/updateUserEnable`, data);
    },

    /*
    * readingArticle 接口
    * */
    addReadingArticle(data){
        return instance.post(`/api/addReadingArticle`, data);
    },
    //根据id获取某篇阅读文章
    getReadingArticleById(data){
        return instance.get(`/api/getReadingArticleById`, {
            params: data
        });
    },
    //获取所有阅读文章列表
    getReadingArticleList(data){
        return instance.get(`/api/getReadingArticleList`, {
            params: data
        });
    },
    //更新阅读文章某项信息
    updateReadingArticleInfo(data){
        return instance.post(`/api/updateReadingArticleInfo`, data);
    },

    /*
    * musicArticle 接口
    * */
    //添加音乐类文章
    addMusicArticle(data){
        return instance.post(`/api/addMusicArticle`, data);
    },
    //根据id获取某篇音乐文章
    getMusicArticleById(data){
        return instance.get(`/api/getMusicArticleById`, {
            params: data
        });
    },
    //获取所有音乐文章列表
    getMusicArticleList(data){
        return instance.get(`/api/getMusicArticleList`, {
            params: data
        });
    },
    //更新音乐文章某项信息
    updateMusicArticleInfo(data){
        return instance.post(`/api/updateMusicArticleInfo`, data);
    },

    /*
    * filmArticle 接口
    * */
    //添加音乐类文章
    addFilmArticle(data){
        return instance.post(`/api/addFilmArticle`, data);
    },
    //根据id获取某篇音乐文章
    getFilmArticleById(data){
        return instance.get(`/api/getFilmArticleById`, {
            params: data
        });
    },
    //获取所有音乐文章列表
    getFilmArticleList(data){
        return instance.get(`/api/getFilmArticleList`, {
            params: data
        });
    },
    //更新音乐文章某项信息
    updateFilmArticleInfo(data){
        return instance.post(`/api/updateFilmArticleInfo`, data);
    },

    /*
    * soundArticle 接口
    * */
    //添加音乐类文章
    addSoundArticle(data){
        return instance.post(`/api/addSoundArticle`, data);
    },
    //根据id获取某篇音乐文章
    getSoundArticleById(data){
        return instance.get(`/api/getSoundArticleById`, {
            params: data
        });
    },
    //获取所有音乐文章列表
    getSoundArticleList(data){
        return instance.get(`/api/getSoundArticleList`, {
            params: data
        });
    },
    //更新音乐文章某项信息
    updateSoundArticleInfo(data){
        return instance.post(`/api/updateSoundArticleInfo`, data);
    },
}