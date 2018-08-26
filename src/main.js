import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import './styles/index.scss'
import './assets/css/meplayer.css'
import './permission'

import utils from './utils';
import validate from './plugin/validate'
import axios from "./api/axios";
import upload from './plugin/upload'

import './components/MusicPlay/js/main'


Vue.config.productionTip = false

Vue.prototype.axios = axios
Vue.prototype.upload = (data, callback) => {
    upload(Vue, data, callback)
}

Vue.use(ElementUI).use(utils.is).use(validate)


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
