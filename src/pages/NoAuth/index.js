import React, { Component } from 'react';
class NoAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<div>无权限查看此页面</div>);
    }
}
 
export default NoAuth;