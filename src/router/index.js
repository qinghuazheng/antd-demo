import {
    DashBoard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
} from '../pages'

export const mainRoutes = [{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
}]

export const adminRoutes = [{
    pathname:'/admin/dashboard',
    component:DashBoard,
    title:'仪表盘',
    isNav:false
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true
},{
    pathname:'/admin/article',
    component:ArticleList,
    title:'文章列表',
    isNav:true,
    exact:true
},{
    pathname:'/admin/article/:id',
    component:ArticleEdit
}]