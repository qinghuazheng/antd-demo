import React,{Component,createRef} from 'react'
import {Card,Row, Col} from 'antd'
import echarts from 'echarts'
import {getShopSaleData} from '../../requests'
import './index.less'
class Dashboard extends Component{
    constructor(){
        super()
        this.graph = createRef()
    }
    initGraph(){
        getShopSaleData().then(res=>{
            const option = {
                title: {
                    text: '销量统计'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: res.amount.map(item=>item.name)
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: res.amount.map(item=>item.count)
                }]
            };
            this.graphChart.setOption(option);
        })
    }
    componentDidMount(){
        this.graphChart = echarts.init(this.graph.current)
        this.initGraph()
    }
    render(){
        return(
            <div className="page">
                <Card title="概览" bordered={false} >
                    <Row gutter={16}>
                        <Col span={6}>
                            <div className="zh-gutter-row" style={{backgroundColor:'#ff4d4f'}}>姚明</div>
                        </Col>
                        <Col span={6}>
                            <div className="zh-gutter-row" style={{backgroundColor:'#52c41a'}}>姚明</div>
                        </Col>
                        <Col span={6}>
                            <div className="zh-gutter-row" style={{backgroundColor:'#faad14'}}>姚明</div>
                        </Col>
                        <Col span={6}>
                            <div className="zh-gutter-row" style={{backgroundColor:'#ff7875'}}>姚明</div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览量" bordered={false} >
                    <div ref={this.graph} style={{height:'400px'}}></div>
                </Card>
            </div>
        )
    }
}

export default Dashboard