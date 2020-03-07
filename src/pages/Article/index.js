import React, { Component } from 'react';
import { Card,Button,Table,Tag,DatePicker } from 'antd'
import format from 'dayjs';
import { getArticles } from '../../requests'
window.format = format

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
            columns:[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },{
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },{
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },{
                  title: '操作',
                  dataIndex: 'action',
                  key: 'action',
                  render: (text, record, index)=>{
                      return <Button>编辑</Button>
                  }
                },
            ],
            total:null
        }
    }
    createColumns = (res) => {
        return Object.keys(res.list[0]).map(key=>
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
    }
    componentDidMount(){
        getArticles().then(res=>{
            const columns = this.createColumns(res)
            this.setState({
                dataSource:res.list,
                columns,
                total:res.total
            })
        })
    }
    render() {
        return ( 
            <Card 
                title="文章列表"
                bordered={false}
                extra={<Button>导出excel</Button>}>
                <Table
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}
                    pagination={{
                        total:this.state.total,
                        hideOnSinglePage:true,
                        // pageSize:1                       
                    }}
                    // loading={true}
                />   
            </Card>
         );
    }
}
 
export default ArticleList;