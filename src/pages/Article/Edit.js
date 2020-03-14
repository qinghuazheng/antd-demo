import React, { Component,createRef } from 'react';
import{Card, Button, Form, Input, DatePicker, Spin, message } from 'antd'
import {getArticle,updateArticle,createArticle} from '../../requests'
import E from 'wangeditor'
import day from 'dayjs'
import './edit.less'

// @Form.create()
class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            isLoading:false,
            title:this.props.match.params.id?'编辑文章':'新增文章'
        }
        this.editorRef = createRef()
        this.formRef = createRef()
        this.id = this.props.match.params.id
    }
    cancelArticleEdit=()=>{
        this.props.history.goBack()
    }
    onFinish=(values)=>{
        this.setState({isLoading:true})
        let data = Object.assign({},values,{createAt:values.createAt.valueOf})
        if(this.id){
            updateArticle(this.id,data).then(res=>{
                message.success('修改成功')
                this.props.history.push('/admin/article')
            }).finally(e=>{
                this.setState({isLoading:false})
            })
        }else{
            createArticle(data).then(res=>{
                message.success('修改成功')
                this.props.history.push('/admin/article')
            }).finally(e=>{
                this.setState({isLoading:false})
            })
        }
    }
    initEditor=()=>{
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html)=>{
            // console.log(this.props.form)
            this.formRef.current.setFieldsValue({
                content:html
            })
        }
        this.editor.create()
    }
    getData(){
        getArticle(this.props.match.params.id).then(res=>{
            let initData = Object.assign({},res,{createAt:day(res.createAt)})
            this.formRef.current.setFieldsValue(initData)
            this.editor.txt.html(initData.content)
        }).finally(()=>{
            this.setState({isLoading:false})
        })
    }
    componentDidMount(){
        this.initEditor()
        //判断是新增文章还是修改文章
        if(this.id){
            this.setState({isLoading:true})
            this.getData()
        }
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
            title={this.state.title}
            bordered={false}
            extra={<Button onClick={this.cancelArticleEdit}>取消</Button>}>
                {/* <div>表单区域</div> */}
                <Spin spinning={this.state.isLoading}>
                <Form
                    ref={this.formRef}
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
                        label="发布时间"
                        name="createAt"
                        rules={[{ required: true, message: '请输入创建时间!' }]}
                    >
                        <DatePicker showTime placeholder="请输入时间"/>
                        {/* <Input placeholder="createAt" /> */}
                    </Form.Item>
                    
                    <Form.Item
                        label="内容"
                        name="content"
                        // rules={[{ required: true, message: '请输入内容!' }]}
                    >
                        <div ref={this.editorRef} className="zh-editor"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
                    </Form.Item>
                </Form>
                </Spin>
            </Card>
        );
    }
}
 
export default Edit;