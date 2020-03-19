import React,{Component}from 'react'
import { Card,Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../actions/user'
import './index.less'
const wrapperCol = {
    xs:{
        span:12
    },
    md:{
        span:12,
        offset:6
    }
}

const mapStateToProps = (state)=>{
  return {
    isLogin:state.user.isLogin,
    isLoading:state.user.isLoading
  }
}
@connect(mapStateToProps,{login})
class Login extends Component{
    
    render(){
        const onFinish = values => {
            this.props.login(values)
          };
        return(
            this.props.isLogin ? <Redirect to="/admin" />
            :
            <Card title="登录" className="zh-login-wrapper">
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名必填' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled={this.props.isLoading} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码必填' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                disabled={this.props.isLoading}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox >记住我</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button loading={this.props.isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Card>
        )
    }
}

export default Login