import React, { Component } from 'react';
import { Card,Button,Table } from 'antd';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },{
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
        ];
        //dataIndex与dataSource中的key进行关联
        const columns = [
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
          ];
        return ( 
            <Card 
                title="文章列表"
                bordered={false}
                extra={<Button>导出excel</Button>}>
                <Table
                    dataSource={dataSource} 
                    columns={columns}
                    pagination={{
                        pageSize:1                       
                    }}
                    // loading={true}
                />   
            </Card>
         );
    }
}
 
export default ArticleList;