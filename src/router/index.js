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
    component:DashBoard
},{
    pathname:'/admin/settings',
    component:Settings
},{
    pathname:'/admin/article',
    component:ArticleList,
    exact:true
},{
    pathname:'/admin/article/:id',
    component:ArticleEdit
}]