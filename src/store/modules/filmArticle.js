import types from "../types";
import axios from "../../api/axios";

export default {
    state: {
        filmArticleList: {
            pageInfo: {},
            docs: []
        },
    },

    getters: {},

    mutations: {
        [types.GET_FILMARTICLELIST](state, data) {
            state.filmArticleList = data.data
        },
    },
    actions: {
        [types.GET_FILMARTICLELIST]({commit}, data = {}) {
            return axios.getFilmArticleList(data).then((res) => {
                commit(types.GET_FILMARTICLELIST, res.data)
            }).catch(error => console.log(error));
        },
    },
};
