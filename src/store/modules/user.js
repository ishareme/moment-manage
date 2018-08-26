import types from "../types";
import axios from "../../api/axios";

export default {
    state: {
        userList: {
            pageInfo: {},
            docs: []
        },
    },

    getters: {},

    mutations: {
        [types.GET_USERLIST](state, data) {
            state.userList = data.data
        },
    },
    actions: {
        [types.GET_USERLIST]({commit}, data = {}) {
            return axios.getUserList(data).then((res) => {
                commit(types.GET_USERLIST, res.data)
            }).catch(error => console.log(error));
        },
    },
};
