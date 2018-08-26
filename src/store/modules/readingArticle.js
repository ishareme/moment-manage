import types from "../types";
import axios from "../../api/axios";

export default {
    state: {
        readingArticleList: {
            pageInfo: {},
            docs: []
        },
    },

    getters: {},

    mutations: {
        [types.GET_READINGARTICLELIST](state, data) {
            state.readingArticleList = data.data
        },
    },
    actions: {
        [types.GET_READINGARTICLELIST]({commit}, data = {}) {
            return axios.getReadingArticleList(data).then((res) => {
                commit(types.GET_READINGARTICLELIST, res.data)
            }).catch(error => console.log(error));
        },
    },
};
