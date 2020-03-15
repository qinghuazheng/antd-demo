import React, { Component } from 'react';
import { Card,Button,Table,Tag,Radio,Modal,Typography,message,Tooltip } from 'antd'
import format from 'dayjs';
import { getArticles,deleteArticle } from '../../requests'
import XLSX from 'xlsx'

const {Title} = Typography;
const titleDisplayMap = {
    id:'id',
    name:'作者',
    address:'地址',
    sign:'签名',
    age:'年龄',
    amount:'数量',
    createdAt:'创建时间'
}
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            //dataIndex与dataSource中的key进行关联
            columns:[],
            total:null,
            loading:false,
            offset:0,
            limit:10,
            deleteArticleModalContent:null,
            isShowArticleModal:false,
            deleteArticleConfirmLoading:false,
        }
    }
    exportData=()=>{
        const Data = [Object.keys(this.state.dataSource)]
        for(let i=1;i<this.state.dataSource.length;i++){
           Data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].name,
                this.state.dataSource[i].age,
                this.state.dataSource[i].amount,
                format(this.state.dataSource[i].createdAt).format("YYYY年MM月DD日 HH:mm:ss"),
            ])
        }
        const ws = XLSX.utils.aoa_to_sheet(Data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb,`${format().format("YYYY年MM月DD日 HH:mm:ss")}.xlsx`)
    }
    getData=()=>{
        getArticles({offset:this.state.offset,limit:this.state.limit}).then(res=>{
            const columns = this.createColumns(res)
            this.setState({
                dataSource:res.list,
                columns,
                total:res.total
            })
        }).catch(error=>{

        }).finally(()=>{
            this.setState({
                loading:false
            })
        })
    }
    createColumns = (res) => {
        const columns = Object.keys(res.list[0]).map(key=>
            {
            if(key === 'amount'){
                return{
                    title:titleDisplayMap[key] || key,
                    key,
                    render:(text,record)=>{
                        const {amount} = record
                    return (
                        <Tooltip title={amount>200?'超过200':'少于200'}>
                            <Tag color={amount>200?'red':'green'}>{amount}</Tag>
                        </Tooltip>
                        )
                    }
                }
            }else if(key === 'createdAt'){
                return{
                    title:titleDisplayMap[key] || key,
                    key,
                    render:(text,record)=>{
                        const {createdAt} = record
                    return (<span>{format(createdAt).format('YYYY年MM月DD日 HH:mm:ss')}</span>)
                    }
                }
            }
            return ({
                title:titleDisplayMap[key] || key,
                dataIndex:key,
                key
            })
        })
        columns.push({
            title:'操作',
            dataIndex:'action',
            render:(text,record)=>(
                <div>
                    <Button type="primary" size="small" onClick={this.editArticle.bind(this,record.id)} style={{marginRight:'8px'}}>编辑</Button>
                    <Button size="small" onClick = {this.showDeleteArticleModal.bind(this,record.id)}>删除</Button>
                </div>
            )
        })
        return columns
    }
    createArticle(){
        this.props.history.push('/admin/article/create')
    }
    editArticle=(id)=>{
        this.props.history.push(`/admin/article/edit/${id}`)
    }
    showDeleteArticleModal=(id)=>{
        this.setState({
            deleteArticleModalContent:id,
            isShowArticleModal:true,
        })   
        //点击确定后，弹框直接消失，体验不好
        // Modal.confirm({
        //     title: <Title level={4}>确认删除<span style={{color:'red'}}>{id}</span>吗?</Title>,
        //     content: '请谨慎操作',
        //     okText: '确认',
        //     cancelText: '取消',
        //     onOk(){
        //         deleteArticle(id).then(res=>message.success(res))
        //     }
        // })
    }
    hideDeleteArticleModal=()=>{
        this.setState({
            isShowArticleModal:false,
            deleteArticleModalContent:'',
            deleteArticleConfirmLoading:false
        })
    }

    deleteArticle=()=>{
        this.setState({
            deleteArticleConfirmLoading:true
        })
        deleteArticle(this.state.deleteArticleModalContent).then(
            res=>{
                message.success(res)
                //此处未重新定位到第一页
                this.setState({
                    offset:0
                },()=>{
                    this.getData()
                })
            }
        ).finally(()=>{
            this.setState({
                deleteArticleConfirmLoading:false,
                isShowArticleModal:false
            })
        })
    }
    onPageChange = (page,pageSize)=>{
        this.setState({
            offset:page-1,
            limit:pageSize
        },()=>{
            this.getData()
        })
    }
    onShowSizeChange = (current, size)=>{
        this.setState({
            offset:0,
            limit:size
        },()=>{
            this.getData()
        })
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        this.getData()
    }
    render() {
        return ( 
            <div className="page">
            <Card 
                title="文章列表"
                bordered={false}
                extra={
                <div>
                    <Button type="primary" onClick={this.createArticle.bind(this)} style={{marginRight:'8px'}}>创建文章</Button>
                    <Button onClick={this.exportData}>导出excel</Button>
                </div>
                }>
                <Table
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}
                    pagination={{
                        total:this.state.total,
                        hideOnSinglePage:true,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onChange:this.onPageChange,
                        onShowSizeChange:this.onShowSizeChange
                        // pageSize:1                       
                    }}
                    loading={this.state.loading}
                />
                <Modal 
                    title="此操作不可逆"
                    visible={this.state.isShowArticleModal}
                    onOk={this.deleteArticle}
                    onCancel={this.hideDeleteArticleModal}
                    confirmLoading={this.state.deleteArticleConfirmLoading}
                >
                    <Title level={4}>确认删除<span style={{color:'red'}}>{this.state.showDeleteArticleModal}</span>吗?</Title>    
                </Modal>   
            </Card>
            </div>
         );
    }
}
 
export default ArticleList;