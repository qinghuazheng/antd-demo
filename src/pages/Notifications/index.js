import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Card, Button,List, Avatar,Badge,Spin } from 'antd';
import {markNotificationAsReadById,markAllNotificationAsRead} from '../../actions/notifications'

const mapStateToProps = (state) => {
    const {list,isLoading} = state.notifications
    return{
        list,
        isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    const markNotificationAsReadById = (id)=>{
        dispatch({
            type:'MARK_NOTIFICATION_AS_READ',
            playload:{
                id
            }
        })
    }
    const markAllNotificationAsRead = ()=>{
        dispatch({
            type:'MARK_ALL_NOTIFICATION_AS_READ'
        })
    }
    return{
        markNotificationAsReadById,
        markAllNotificationAsRead
    }
}

@connect(mapStateToProps,{markNotificationAsReadById,markAllNotificationAsRead})
// @connect(mapStateToProps,mapDispatchToProps)
class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        // this.props.b()   
    }
    render() { 
        return (
            <Spin spinning={this.props.isLoading}>
            <div className="page">
                <Card title="通知中心" bordered={false} extra={<Button disabled={this.props.list.every(item=>item.readState)} onClick={this.props.markAllNotificationAsRead}>全部标记为已读</Button>}>
                    <List
                        dataSource={this.props.list}
                        itemLayout="horizontal"
                        renderItem={item=>(
                            <List.Item
                                extra={!item.readState?<Button onClick = {this.props.markNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>:null}
                            >
                            {/* <List.Item
                                extra={!item.readState?<Button onClick = {this.props.markNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>:null}
                            ></List.Item> */}
                                <List.Item.Meta 
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<Badge dot={!item.readState} >{item.title}</Badge>}
                                description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
            </Spin>
        );
    }
}
 
export default Notifications