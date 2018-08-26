import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

//在路由中基于webpack实现组件的懒加载
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const manage = r => require.ensure([], () => r(require('../views/manage/manage'), 'manage'))

//manage中的组件
//首页 数据
const dashboard = r => require.ensure([], () => r(require('../views/dashboard'), 'dashboard'))
//用户管理
const UserAll = r => require.ensure([], () => r(require('../views/user/all'), 'UserAll'))
const AdminList = r => require.ensure([], () => r(require('../views/user/admin'), 'AdminList'))
const UserProfile = r => require.ensure([], () => r(require('../views/user/profile'), 'UserProfile'))
//内容管理
const reading = r => require.ensure([], () => r(require('../views/content/reading'), 'reading'))
const readingList = r => require.ensure([], () => r(require('../views/content/reading/list'), 'readingList'))
const readingRelease = r => require.ensure([], () => r(require('../views/content/reading/release'), 'readingRelease'))
const film = r => require.ensure([], () => r(require('../views/content/film'), 'film'))
const filmList = r => require.ensure([], () => r(require('../views/content/film/list'), 'filmList'))
const filmRelease = r => require.ensure([], () => r(require('../views/content/film/release'), 'filmRelease'))
const music = r => require.ensure([], () => r(require('../views/content/music'), 'music'))
const musicList = r => require.ensure([], () => r(require('../views/content/music/list'), 'musicList'))
const musicRelease = r => require.ensure([], () => r(require('../views/content/music/release'), 'musicRelease'))
const sound = r => require.ensure([], () => r(require('../views/content/sound'), 'sound'))
const soundList = r => require.ensure([], () => r(require('../views/content/sound/list'), 'soundList'))
const soundRelease = r => require.ensure([], () => r(require('../views/content/sound/release'), 'soundRelease'))
//系统管理
const ad = r => require.ensure([], () => r(require('../views/system/ad'), 'ad'))
const announce = r => require.ensure([], () => r(require('../views/system/announce'), 'announce'))
const banner = r => require.ensure([], () => r(require('../views/system/banner'), 'banner'))
const role = r => require.ensure([], () => r(require('../views/system/role'), 'role'))
const special = r => require.ensure([], () => r(require('../views/system/special'), 'special'))

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
    {
        path: '/login',
        name: '登录页面',
        component: login,
        hidden: true
    },
    {
        path: '',
        component: manage,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: dashboard,
                meta: {
                    title: '首页',
                    icon: 'iconfont icon-01',
                    noCache: true
                }
            }
        ]
    },
]

export const asyncRouterMap = [
    // {
    //     path: '/user',
    //     component: manage,
    //     redirect: '/user/list/all',
    //     meta: {
    //         roles: 'admin', // you can set roles in root nav
    //         icon: 'iconfont icon-yonghu',
    //         title: '用户管理'
    //     },
    //     children: [
    //         {
    //             path: '/user/list',
    //             component: UserList,
    //             redirect: '/user/list/all',
    //             meta: {
    //                 title: '用户列表',
    //                 roles: 'admin',
    //             },
    //             children: [
    //                 {
    //                     path: 'all',
    //                     component: UserAllList,
    //                     // name: '总用户列表',
    //                     meta: {
    //                         title: '总用户列表',
    //                         roles: 'admin',
    //                     }
    //                 },
    //                 {
    //                     path: 'admin',
    //                     component: AdminList,
    //                     // name: '管理员列表',
    //                     meta: {
    //                         title: '管理员列表',
    //                         roles: 'admin',
    //                     }
    //                 },
    //             ]
    //         },
    //         {
    //             path: 'check',
    //             component: UserCheck,
    //             // name: '作者审核',
    //             meta: {
    //                 title: '作者审核',
    //                 roles: 'admin',
    //             }
    //         }
    //     ]
    // },
    {
        path: '/user',
        component: manage,
        redirect: 'noredirect',
        requiresAuth: true,
        meta: {
            roles: 'admin', // you can set roles in root nav
            icon: 'iconfont icon-yonghu',
            title: '用户管理'
        },
        children: [
            {
                path: 'all',
                component: UserAll,
                meta: {
                    title: '总用户列表',
                    roles: 'admin',
                }
            },
            {
                path: 'admin',
                component: AdminList,
                meta: {
                    title: '管理员列表',
                    roles: 'admin',
                }
            },
            {
                path: 'profile',
                component: UserProfile,
                hidden: true,
                meta: {
                    title: '个人资料',
                    roles: 'admin',
                }
            }
        ]
    },
    {
        path: '/content',
        component: manage,
        redirect: '/content/reading/list',
        meta: {
            icon: 'iconfont icon-neirong',
            title: '内容管理'
        },
        children: [
            {
                path: '/reading/list',
                component: reading,
                redirect: '/content/reading/list',
                meta: {
                    title: '阅读文章管理',
                },
                children: [
                    {
                        path: 'release',
                        component: readingRelease,
                        meta: {
                            title: '阅读发布',
                        }
                    },
                    {
                        path: 'list',
                        component: readingList,
                        meta: {
                            title: '阅读列表',
                        }
                    },
                ]
            },
            {
                path: '/music/list',
                component: music,
                redirect: '/content/music/list',
                meta: {
                    title: '音乐文章管理',
                },
                children: [
                    {
                        path: 'release',
                        component: musicRelease,
                        meta: {
                            title: '音乐发布',
                        }
                    },
                    {
                        path: 'list',
                        component: musicList,
                        meta: {
                            title: '音乐列表',
                        }
                    },
                ]
            },
            {
                path: '/film/list',
                component: film,
                redirect: '/content/film/list',
                meta: {
                    title: '影视文章管理',
                },
                children: [
                    {
                        path: 'release',
                        component: filmRelease,
                        meta: {
                            title: '影视发布',
                        }
                    },
                    {
                        path: 'list',
                        component: filmList,
                        meta: {
                            title: '影视列表',
                        }
                    },
                ]
            },
            {
                path: '/sound/list',
                component: film,
                redirect: '/content/sound/list',
                meta: {
                    title: '电台文章管理',
                },
                children: [
                    {
                        path: 'release',
                        component: soundRelease,
                        meta: {
                            title: '电台发布',
                        }
                    },
                    {
                        path: 'list',
                        component: soundList,
                        meta: {
                            title: '电台列表',
                        }
                    },
                ]
            },
        ]
    },
    // {
    //     path: '/content',
    //     component: manage,
    //     redirect: 'noredirect',
    //     requiresAuth: true,
    //     meta: {
    //         icon: 'iconfont icon-neirong',
    //         title: '内容管理'
    //     },
    //     children: [
    //         {
    //             path: 'image',
    //             component: image,
    //             // name: '图文管理',
    //             meta: {
    //                 title: '图文管理',
    //             }
    //         },
    //         {
    //             path: 'article',
    //             component: article,
    //             // name: '文章管理',
    //             meta: {
    //                 title: '文章管理',
    //             }
    //         },
    //         {
    //             path: 'music',
    //             component: music,
    //             // name: '音乐管理',
    //             meta: {
    //                 title: '音乐管理',
    //             }
    //         },
    //         {
    //             path: 'film',
    //             component: film,
    //             // name: '影视管理',
    //             meta: {
    //                 title: '影视管理',
    //             }
    //         },
    //         {
    //             path: 'sound',
    //             component: sound,
    //             // name: '电台管理',
    //             meta: {
    //                 title: '电台管理',
    //             }
    //         },
    //     ]
    // },
    {
        path: '/system',
        component: manage,
        redirect: 'noredirect',
        meta: {
            roles: 'admin', // you can set roles in root nav
            icon: 'iconfont icon-xitong',
            title: '系统管理'
        },
        children: [
            {
                path: 'ad',
                component: ad,
                // name: '广告管理',
                meta: {
                    title: '广告管理',
                    icon: 'lock',
                    roles: 'admin' // or you can only set roles in sub nav
                }
            },
            {
                path: 'announce',
                component: announce,
                // name: '公告管理',
                meta: {
                    title: '公告管理',
                    icon: 'lock',
                    roles: 'admin' // or you can only set roles in sub nav
                }
            },
            {
                path: 'banner',
                component: banner,
                // name: 'banner管理',
                meta: {
                    title: 'banner管理',
                    icon: 'lock',
                    roles: 'admin' // or you can only set roles in sub nav
                }
            },
            {
                path: 'role',
                component: role,
                // name: '角色管理',
                meta: {
                    title: '角色管理',
                    icon: 'lock',
                    roles: 'admin' // or you can only set roles in sub nav
                }
            },
            {
                path: 'special',
                component: special,
                // name: '专题管理',
                meta: {
                    title: '专题管理',
                    icon: 'lock',
                    roles: 'admin' // or you can only set roles in sub nav
                }
            },
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]



const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

// const whiteList = ['/login', '/authredirect'] // 不重定向白名单
// //注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//     //获取store里面的token
//     let token = window.localStorage.getItem('token');
//     //判断要去的路由有没有requiresAuth
//     if(to.meta.requiresAuth){
//         if(token){
//             next();
//         }else{
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//             });
//         }
//
//     }else{
//         next();//如果无需token,那么随它去吧
//     }
// });

export default router