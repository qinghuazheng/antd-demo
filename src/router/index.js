import React from 'react';
import {
    DashBoard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile
} from '../pages'
import {  DesktopOutlined,  PieChartOutlined,  FileOutlined  } from '@ant-design/icons';

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
    isNav:true,
    icon:<DesktopOutlined/>,
    roles:['001','002','003']
},{
    pathname:'/admin/article',
    component:ArticleList,
    title:'文章列表',
    isNav:true,
    icon:<FileOutlined/>,
    exact:true,
    roles:['001','002']
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true,
    icon:<PieChartOutlined/>,
    roles:['001']
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit,
    roles:['001','002']
},{
    pathname:'/admin/article/create',
    component:ArticleEdit,
    roles:['001','002']
},{
    pathname:'/admin/notifications',
    component:Notifications,
    roles:['001','002','003']
},{
    pathname:'/admin/noauth',
    component:NoAuth,
    roles:['001','002','003']   
},{
    pathname:'/admin/profile',
    component:Profile,
    roles:['001','002','003']    
}]