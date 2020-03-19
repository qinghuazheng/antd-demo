import React, { Component } from 'react'
import { Layout, Menu,Dropdown,Avatar,Badge} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getNotificationList} from '../../actions/notifications'
import {logout} from '../../actions/user'
import './frame.less'
import logo from './logo.png'


const { Header, Content, Sider } = Layout


const mapStateToProps = (state) => {
  return{
    notificationCounts:state.notifications.list.filter(item=>!item.readState).length,
    avatar:state.user.avatar,
    displayName:state.user.displayName
  }
}
@connect(mapStateToProps,{getNotificationList,logout})
@withRouter
class Frame extends Component{    
    onMenuClick = ({ item, key, keyPath, domEvent }) => {
      // console.log(item, key, this.props)
      this.props.history.push(key)
    }
    onDropdownMenuClick = ({key})=>{
      if(key === '/logout'){
        this.props.logout()
      }else{
        this.props.history.push(key)
      }    
    }
    renderDropDown = () => (
      <Menu onClick={this.onDropdownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot={this.props.notificationCounts}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
            个人设置
        </Menu.Item>
        <Menu.Item key="/logout">
            退出
        </Menu.Item>
      </Menu>
    )
    componentDidMount(){
        //首页加载慢的原因
        this.props.getNotificationList()
    }
    render(){
      const selectedKeys = this.props.location.pathname.split('/')
      selectedKeys.length=3
        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header zh-header">
              <div className="logo zh-logo">
                  <img src={logo} alt="logo"/>
              </div>
              <div className="zh-info">
              <Dropdown overlay={this.renderDropDown()} className="zh-info-drop">
                <div>
                  <Avatar src={this.props.avatar} />
                  <span>欢迎您，{this.props.displayName}</span>
                  <Badge count={this.props.notificationCounts} offset={[-10,-10]}>
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
              <Layout>
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