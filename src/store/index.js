import Vue from 'vue'
import Vuex from 'vuex'

import header from './modules/header';
import login from './modules/login';
import permission from './modules/permission';
import todo from './modules/todo';
import admin from './modules/admin';
import user from './modules/user';
import readingArticle from './modules/readingArticle';
import musicArticle from './modules/musicArticle';
import filmArticle from './modules/filmArticle';
import soundArticle from './modules/soundArticle';



Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        header,
        login,
        permission,
        todo,
        admin,
        user,
        readingArticle,
        musicArticle,
        filmArticle,
        soundArticle
    },
    state: {},

    getters: {
        userInfo: state => state.admin.userInfo,//用户所有信息
        token: state => state.admin.userInfo.data.token, //用户令牌
        role: state => state.admin.userInfo.data.role,
        _id: state => state.admin.userInfo._id,

        permission_routers: state => {
            // 对应permission.js中的state.routers
            return  state.permission.routers;

        },
        addRouters: state => state.permission.addRouters,

        //admin
        //管理员列表
        adminList: state => state.admin.adminList,
        //所有管理员username
        allAdminUserName: state => state.admin.allAdminUserName,

        //user
        //所有用户列表
        userList: state => state.user.userList,

        //readingArticle
        readingArticleList: state => state.readingArticle.readingArticleList,

        //musicArticle
        musicArticleList: state => state.musicArticle.musicArticleList,

        //filmArticle
        filmArticleList: state => state.filmArticle.filmArticleList,

        //soundArticle
        soundArticleList: state => state.soundArticle.soundArticleList,
    },
})
