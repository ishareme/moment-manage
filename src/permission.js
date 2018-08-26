import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import types from './store/types'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/authredirect'] // 白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    let token = window.localStorage.getItem('token');
    let _id = window.localStorage.getItem('_id');
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (token !== 'null' && token !== 'undefined' && token) {
        if (to.path === '/login' && token) {
            next()
            NProgress.done()
        }
        else if (!_id){
            next({ path: '/login' , replace: true})
        }
        else {
            if (!userInfo) { // 判断当前用户是否已拉取完admin_info信息
                store.dispatch(types.GET_ADMININFO, {_id: _id}).then((res) => { // 拉取admin_info
                    if (!store.state.user.userInfo){
                        next({ path: '/login' , replace: true})
                    }
                    else {
                        let role = !!store.state.user.userInfo.data.role ? store.state.user.userInfo.data.role : 'author' // 'admin' or 'author'
                        store.dispatch('GenerateRoutes', { role }).then(() => { // 根据roles权限生成可访问的路由表
                            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                            next({ ...to, replace: true })
                            NProgress.done()
                        }).catch(() => {
                            next({ path: '/login' , replace: true})
                        })
                    }
                })
                console.log(store.dispatch(types.GET_ADMININFO, {_id: _id}))
            }
            else {
                let role = userInfo.data.role
                store.dispatch('GenerateRoutes', { role }).then(() => { // 根据roles权限生成可访问的路由表
                    router.addRoutes(store.getters.addRouters)
                })
                next()
                NProgress.done()
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) > -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: '/login' , replace: true}) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
