import types from "../types";
import axios from "../../api/axios";

export default {
    state: {
        musicArticleList: {
            pageInfo: {},
            docs: []
        },
    },

    getters: {},

    mutations: {
        [types.GET_MUSICARTICLELIST](state, data) {
            state.musicArticleList = data.data
        },
    },
    actions: {
        [types.GET_MUSICARTICLELIST]({commit}, data = {}) {
            return axios.getMusicArticleList(data).then((res) => {
                commit(types.GET_MUSICARTICLELIST, res.data)
            }).catch(error => console.log(error));
        },
    },
};
