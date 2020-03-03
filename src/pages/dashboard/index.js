import React,{Component} from 'react'
import {Button} from 'antd'

//可以为木偶组件增加生命周期
const Parents = (Child)=>{
    class NewParents extends Component{
        render(){
            return (
                <div>
                    <span>首页</span>
                    <Child {...this.props} newName="高阶组件"/>
                </div>
            )
        }
    }
    return NewParents
}

//高阶组件装饰器写法 
//将自身当作参数传入装饰器
@Parents
class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { style, newName, name } = this.props
        return (
          <div style={style}>
               <Button type="primary">{newName || name}</Button>
          </div>
        )
    }
}

export default App


//普通高阶组件 
//传入一个组件 返回一个函数式组件
// const Parents = (Child)=>()=>{
//     return (<div>
//         <span>111</span>
//         <Child />
//     </div>)
// }

// const App = () => (
//     <div className='app'>
//         <Button type="primary">Button</Button>
//     </div>    
// )

// export default Parents(App)