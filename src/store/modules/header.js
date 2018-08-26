import types from '../types'

export default {
    // namespaced: true,
    state: {
        openedMenu: true,
        loading: false,
        routers: [],
        openedModifyPasswordDialog: false,
    },
    getters: {},
    mutations: {
        [types.TOGGLE_MENU] (state) {
            state.openedMenu = !state.openedMenu
        },
        [types.HIDDEN_MENU] (state) {
            state.openedMenu = false
        }
    },
    actions: {
        // 显示加载动画
        // [SHOW_LOADING]({commit}) {
        //     commit(SHOW_LOADING);
        // },
        //
        // // 显示加载动画
        // [HIDE_LOADING]({commit}) {
        //     commit(HIDE_LOADING);
        // },
    },
};
