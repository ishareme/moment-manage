import axios from '../../api/axios'
import types from '../types'

export default {
    // namespaced: true,

    state: {
        toDoList: [
        ]
    },

    mutations: {
        [types.ADD_TODOITEM](state, data) {
            state.toDoList = window.localStorage.getItem('todo') === null ? [] :  JSON.parse(window.localStorage.getItem('todo'));
            state.toDoList.unshift(data)
            window.localStorage.setItem('todo', JSON.stringify(state.toDoList));
        },
        [types.DELETE_TODOITEM](state, data) {
            state.toDoList = window.localStorage.getItem('todo') === null ? [] :  JSON.parse(window.localStorage.getItem('todo'));
            state.toDoList.splice(state.toDoList.indexOf(data), 1)
            window.localStorage.setItem('todo', JSON.stringify(state.toDoList));
        },
        [types.TOGGLE_TODOITEM](state, data) {
            state.toDoList = window.localStorage.getItem('todo') === null ? [] :  JSON.parse(window.localStorage.getItem('todo'));
            let newTodo = state.toDoList.map((item, index) => {
                if (item.text === data.text){
                    item.done = data.done
                }
                return item
            })
            window.localStorage.setItem('todo', JSON.stringify(newTodo));
        },
    },
};
