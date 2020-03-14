import React from 'react';
import {
    DashBoard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
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
    icon:<DesktopOutlined/>
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true,
    icon:<PieChartOutlined/>
},{
    pathname:'/admin/article',
    component:ArticleList,
    title:'文章列表',
    isNav:true,
    icon:<FileOutlined/>,
    exact:true
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit
},{
    pathname:'/admin/article/create',
    component:ArticleEdit
}]