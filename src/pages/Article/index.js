import React, { Component } from 'react';
import { Card,Button,Table,Tag,Radio } from 'antd'
import format from 'dayjs';
import { getArticles } from '../../requests'
import XLSX from 'xlsx'

const titleDisplayMap = {
    id:'id',
    name:'作者',
    address:'地址',
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
            limit:10
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
                    return (amount>200?<Tag color='red'>{amount}</Tag>:<Tag color='green'>{amount}</Tag>)
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
            render:()=>(
                <Radio.Group>
                    <Radio.Button size="small">编辑</Radio.Button>
                    <Radio.Button size="small">删除</Radio.Button>
                </Radio.Group>
            )
        })
        return columns
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
            <Card 
                title="文章列表"
                bordered={false}
                extra={<Button onClick={this.exportData}>导出excel</Button>}>
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
            </Card>
         );
    }
}
 
export default ArticleList;