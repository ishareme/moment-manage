import types from "../types";
import axios from "../../api/axios";

export default {
    state: {
        soundArticleList: {
            pageInfo: {},
            docs: []
        },
    },

    getters: {},

    mutations: {
        [types.GET_SOUNDARTICLELIST](state, data) {
            state.soundArticleList = data.data
        },
    },
    actions: {
        [types.GET_SOUNDARTICLELIST]({commit}, data = {}) {
            return axios.getSoundArticleList(data).then((res) => {
                commit(types.GET_SOUNDARTICLELIST, res.data)
            }).catch(error => console.log(error));
        },
    },
};
