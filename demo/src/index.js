'use strict'
import Mlux from 'mlux';
import Binder from './../../Binder';
import React from 'react';
import ReactDOM from 'react-dom';
import stores from './stores'

function Header() {
    return <header>user center</header>
}
class UserInfo extends React.Component {
    constructor(...props) {
        super(...props);
    }
    _renderTimestamps(){
        return <p>{Date.now()}</p>
    }
    render() {
        return <ul>
            {this._renderTimestamps()}
            <li>姓名:{this.props.name}</li>
            <li>年龄:{this.props.age}岁</li>
            <li>性别:{this.props.gender}</li>
        </ul>
    }

}

var UserInfoBinder = Binder.createClass(UserInfo)
class App extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            name: '周五'
        }
    }
    componentDidMount() {
        Mlux.StoreManager.user.username = 'asss'
    }

    render() {
        return <div>
            <Header></Header>
            <UserInfoBinder name={this.state.name} bind = {[Mlux.StoreManager.user]} propsUpdater = {()=>{
                return {
                    name:Mlux.StoreManager.user.username
                }}}></UserInfoBinder>
            <footer>version 1.0.0</footer>
        </div>
    }
}

Mlux.StoreManager.load(stores).then(() => {
    setTimeout(function () {

        ReactDOM.render(<App></App>, document.body);
    })
});
