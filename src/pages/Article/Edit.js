import React, { Component } from 'react';
import{Card, Button, Form, Input} from 'antd'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    cancelArticleEdit=()=>{
        this.props.history.go(-1)
    }
    onFinish=(values)=>{
        console.log(values)
    }
    render() { 
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return ( 
            <Card 
            title='编辑文章'
            bordered={false}
            extra={<Button onClick={this.cancelArticleEdit}>取消</Button>}>
                {/* <div>表单区域</div> */}
                <Form
                    name="normal_login"
                    className="login-form"
                    {...formItemLayout}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入标题!' }]}
                    >
                        <Input placeholder="title" />
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '请输入作者!' }]}
                    >
                        <Input placeholder="author" />
                    </Form.Item>
                    
                    <Form.Item
                        label="阅读量"
                        name="amount"
                        rules={[{ required: true, message: '请输入阅读量!' }]}
                    >
                        <Input placeholder="0" />
                    </Form.Item>
                    
                    <Form.Item
                        label="创建时间"
                        name="createAt"
                        rules={[{ required: true, message: '请输入创建时间!' }]}
                    >
                        <Input placeholder="createAt" />
                    </Form.Item>
                    
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入内容!' }]}
                    >
                        <div>这是文章内容</div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}
 
export default Edit;