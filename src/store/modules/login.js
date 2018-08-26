import axios from '../../api/axios'
import types from '../types'

export default {
    // namespaced: true,

    state: {
        wishText: [
            'Wish you have a nice day :)',
            'May happiness follow you wherever you go',
            'I love you more then I can say',
            'You are everything to me',
            'When I think of you the miles between us disappear',
            'You’re the luckiest guy in the world',
            'May you have a long and loving life together',
            'Wishing you many years of joy and happiness'
        ],
        wishBg: [
            '#fdf7da',
            '#fdebd8',
            '#fdc7da',
            '#cafdfa',
            '#ddfde3',
            '#eff6fd',
            '#e1e9fd',
            '#fde8ea',
            '#fdccd8'
        ],
        adminInfo: {
            token: null,
            adminName: '',
            avatar: '',
            message: '',
            status: null,
        },
    },

    getters: {
        randomWishText(state){
            return state.wishText[Math.floor(Math.random() * state.wishText.length)]
        },
        randomWishBg(state){
            return state.wishBg[Math.floor(Math.random() * state.wishBg.length)]
        },
    },

    mutations: {
        // [types.ADMIN_LOGIN](state, data) {
        //     let adminInfo = data.data
        //     state.adminInfo = {
        //         ...state.adminInfo,
        //         ...adminInfo,
        //     }
        //     window.localStorage.setItem('token', adminInfo.token);
        // },
        // [types.ADMIN_LOGINOUT](state) {
        //     state.adminInfo.token = null;
        //     window.localStorage.removeItem('token');
        // },
        // [types.ADMIN_REGISTER](state, data) {
        //     state.adminInfo.token = data;
        //     window.localStorage.setItem('token', data);
        // },
    },

    actions: {
        // [types.ADMIN_LOGIN]({commit, state}, data) {
        //     return axios.adminLogin(data).then((res) => {
        //                 commit(types.ADMIN_LOGIN, res);
        //             }).catch((data) =>{
        //                 // console.log(data)
        //     });
        // },
        // [types.ADMIN_LOGINOUT]({commit, state}){
        //     commit(types.ADMIN_LOGINOUT);
        // },
        // [types.ADMIN_REGISTER]({commit}, data) {
        //     return axios.adminRegister(data).then((res) => {
        //         // commit(types.ADMIN_REGISTER, res);
        //         console.log('register', res)
        //     });
        // },
    },
};
