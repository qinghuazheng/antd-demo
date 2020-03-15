import React, { Component } from 'react'
import { Layout, Menu,Dropdown,Avatar,Badge} from 'antd'
import { DownOutlined } from '@ant-design/icons';
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
    onDropdownMenuClick = ({key})=>{
      this.props.history.push(key)
    }
    menu = (
      <Menu onClick={this.onDropdownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
            个人设置
        </Menu.Item>
        <Menu.Item key="/login">
            退出
        </Menu.Item>
      </Menu>
    )
    render(){
      const selectedKeys = this.props.location.pathname.split('/')
      selectedKeys.length=3
        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header zh-header">
              <div className="logo zh-logo">
                  <img src={logo} alt="logo"/>
              </div>
              <div class="zh-info">
              <Dropdown overlay={this.menu} className="zh-info-drop">
                <div>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <span>欢迎您，科比</span>
                  <Badge count={555} offset={[-10,-10]}>
                  <DownOutlined />
                  </Badge>
                </div>
              </Dropdown>
              </div>
            </Header>
            <Layout className="zh-layout">
              <Sider width={200} className="site-layout-background">
                <Menu
                  onClick={this.onMenuClick}
                  mode="inline"
                  selectedKeys={[selectedKeys.join('/')]}
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
              <Layout style={{  }}>
                <Content className="zh-layout-content">
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
            </Layout>
        )
    }
}

export default Frame