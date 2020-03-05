import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { render } from 'react-dom'
import {adminRoutes} from '../../router'
import './frame.less'
import logo from './logo.png'


const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
export default class Frame extends Component{
    render(){
        return (
            <Layout>
            <Header className="header zh-header">
              <div className="logo zh-logo">
                  <img src={logo} />
              </div>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        this.props.menus.map(item=>(
                        <Menu.Item key={item.pathname}>{item.title}</Menu.Item>
                        ))
                    }
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
            </Layout>
        )
    }
}