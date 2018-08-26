import types from "../types";
import axios from "../../api/axios";

export default {
    // namespaced: true,

    state: {
        userInfo: {
            type: '',
            message: '',
            status: null,
            data: {
                token: null,
                nickname: '',
                avatar: '',
                data_type: 0,
                message: '',
                status: null,
                role: null,
                _id: null,
            }
        },
        adminList: {
            pageInfo: {},
            docs: []
        },
        allAdminUserName: []
    },

    getters: {},

    mutations: {
        [types.ADMIN_LOGIN](state, data) {
            state.userInfo= {
                ...state.userInfo,
                ...data.data
            }
            console.log(state.userInfo)
            window.localStorage.setItem('token', state.userInfo.data.token);
            window.localStorage.setItem('_id', state.userInfo.data._id);
            window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        [types.ADMIN_LOGINOUT](state) {
            state.userInfo.data.token = null;
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('_id');
            window.localStorage.removeItem('userInfo', JSON.stringify(state.userInfo));
        },
        [types.ADMIN_REGISTER](state, data) {
            state.userInfo = {
                ...state.userInfo,
                ...data.data,
            }
            window.localStorage.setItem('token', state.userInfo.data.token);
            window.localStorage.setItem('_id', state.userInfo.data._id);
            window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        [types.GET_ADMININFO](state, data) {
            state.userInfo = data.data
            window.localStorage.setItem('token', state.userInfo.data.token);
            window.localStorage.setItem('_id', state.userInfo.data._id);
            window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        [types.GET_ADMINLIST](state, data) {
            state.adminList = data.data
        },
        [types.GET_ALLADMINUSERNAME](state, data) {
            state.allAdminUserName = data.data.data
        },
    },
    actions: {
        [types.ADMIN_LOGIN]({commit, state}, data) {
            return axios.adminLogin(data).then((res) => {
                commit(types.ADMIN_LOGIN, res);
            }).catch((data) =>{
                // console.log(data)
            });
        },

        [types.ADMIN_LOGINOUT]({commit, state}){
            commit(types.ADMIN_LOGINOUT);
        },

        [types.ADMIN_REGISTER]({commit}, data) {
            return axios.adminRegister(data).then((res) => {
                commit(types.ADMIN_REGISTER, res);
            }).catch(error => console.log(error));
        },

        [types.GET_ADMININFO]({commit}, data) {
            return axios.getAdminInfo(data._id).then((res) => {
                return new Promise((resolve, reject) => {
                    if (!res.data.status) reject(res)
                    commit(types.GET_ADMININFO, res);
                    resolve(res)
                })
            }).catch(error => console.log(error));
        },

        [types.GET_ADMINLIST]({commit}, data = {}) {
            return axios.getAdminList(data).then((res) => {
                commit(types.GET_ADMINLIST, res.data)
            }).catch(error => console.log(error));
        },

        [types.ADD_ADMIN]({dispatch, commit}, data = {}) {
            return axios.addAdmin(data).then((res) => {
                console.log('res.data',res.data)
                dispatch(types.GET_ADMINLIST)
                return Promise.resolve(res.data)
            }).catch(error => console.log(error));
        },

        [types.GET_ALLADMINUSERNAME]({dispatch, commit}, data = {}) {
            return axios.getAllAdmin('username').then((res) => {
                commit(types.GET_ALLADMINUSERNAME, res)
            }).catch(error => console.log(error));
        },
    },
};
