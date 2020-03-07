import React, { Component } from 'react'
import { Layout, Menu} from 'antd'
import {withRouter} from 'react-router-dom'
import './frame.less'
import logo from './logo.png'


const { Header, Content, Sider } = Layout


@withRouter
class Frame extends Component{
    onMenuClick = ({ item, key, keyPath, domEvent }) => {
      // console.log(item, key, this.props)
      this.props.history.push(key)
    }
    render(){
        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header zh-header">
              <div className="logo zh-logo">
                  <img src={logo} alt="logo"/>
              </div>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  onClick={this.onMenuClick}
                  mode="inline"
                  selectedKeys={[this.props.location.pathname]}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        this.props.menus.map(item=>(
                        <Menu.Item key={item.pathname}>
                          {item.icon}
                          {item.title}
                        </Menu.Item>
                        ))
                    }
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px' }}>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: 0,
                    minHeight: 280,
                    background:'#fff'
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

export default Frame