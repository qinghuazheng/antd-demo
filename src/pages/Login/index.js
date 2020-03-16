import React,{Component}from 'react'
import { Card,Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
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

class Login extends Component{
    
    render(){
        // const onFinish = values => {
        //     console.log('Received values of form: ', values)
        //   };
        return(
            <Card title="登录" className="zh-login-wrapper">
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名必填' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码必填' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
          </Form>
          </Card>
        )
    }
}

export default Login