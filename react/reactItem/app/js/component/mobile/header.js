import React from 'react';
import {Link,IndexLink} from 'react-router';
import $ from 'jquery';
import '../../../css/header.less';
export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            zt: false,
            loginId: 'show',
            registerId: 'hide',
            uname: localStorage.getItem('name')
        }
    }

    /*开启模态框*/
    headerLogin() {
        this.setState({
            zt: true
        })

    }

    /*关闭模态框*/
    close() {
        this.setState({
            zt: false
        })
    }

    /*切换选项卡*/
    tab(event) {
        if (event.target.nodeName == 'LI') {
            if (event.target.innerHTML == '登录') {
                this.setState({
                    loginId: 'show',
                    registerId: 'hide'
                })
            } else {
                this.setState({
                    loginId: 'hide',
                    registerId: 'show'
                })
            }
        }
    }

    /*注册*/
    register(event) {
        let username = $('.register input[name=username]').val();
        let password = $('.register input[name=password]').val();
        let repassword = $('.register input[name=repassword]').val();
        fetch('http://www.iwen.wiki/sxtstu/news/adduser.php?username=' + username + '&password=' + password + '&repassword=' + repassword, {
            method: 'get'
        })
            .then((response)=> {
                return response.json()
            })
            .then((data)=> {
                if (data == 'success') {
                    alert('注册成功');
                    /*注册完成后切换到登录选项卡*/
                    this.setState({
                        loginId: 'show',
                        registerId: 'hide'
                    })
                } else {
                    alert('注册失败');
                }
            })
    }

    /*登录*/
    login() {
        let username = $('.login input[name=username]').val();
        let password = $('.login input[name=password]').val();
        fetch("http://www.iwen.wiki/sxtstu/news/selectuser.php?username=" + username + "&password=" + password, {
            method: 'get'
        })
            .then(response=>response.json())
            .then(data=> {
                console.log(data)
                /*登录完成后让模态框消失*/
                this.setState({
                    zt: false,
                    uname: data.username //重置uname
                });
                /*将uname存到localStorage*/
                localStorage.setItem('name', data.username);
            })

    }

    /*退出登录*/
    unLogin() {
        this.setState({
            uname: null  //重置uname
        });
        /*移除localStorage中的uname*/
        localStorage.removeItem('name')
    }

    render() {

        return (
            <div >
                {/*头部*/}
                <div className="header-top">新闻{
                    /*判断是否登录 采用哪个模板*/
                    this.state.uname
                        ?
                        <span onTouchStart={this.unLogin.bind(this)}>{this.state.uname}</span>
                        :
                        <span onTouchStart={this.headerLogin.bind(this)}>登录/注册</span>
                }

                </div>
                {/*底部*/}
                <ul className="header-bottom">
                    <li>
                        <IndexLink to={`/`}>
                            推荐
                        </IndexLink>
                    </li>
                    <li>
                        <Link to={`/other/${'top'}/${30}`}>
                            头条
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'yule'}/${30}`}>
                            娱乐
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'guonei'}/${30}`}>
                            国内
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'guoji'}/${30}`}>
                            国际
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'tiyu'}/${30}`}>
                            体育
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'shehui'}/${30}`}>
                            社会
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'shishang'}/${30}`}>
                            时尚
                        </Link>
                    </li>
                    <li>
                        <Link to={`/other/${'keji'}/${30}/`}>
                            科技
                        </Link>
                    </li>
                </ul>
                {/*模态框*/}
                {/*判断是否显示模态框*/}
                <div id={this.state.zt ? 'on' : 'off'}>
                    <div className="model-dialogs" onTouchStart={this.close.bind(this)}></div>
                    <div className="model-dialogs-son">
                        {/*选项卡*/}
                        <div className="tabs">
                            <ul onTouchStart={this.tab.bind(this)}>
                                <li className={this.state.loginId}>登录</li>
                                <li className={this.state.registerId}>注册</li>
                            </ul>
                            <div className="login section" id={this.state.loginId}>
                                <div>
                                    <label htmlFor="">账户:</label><input type="text" name="username" maxLength="16"/>
                                </div>
                                <div>
                                    <label htmlFor="">密码:</label><input type="password" name="password" maxLength="16"/>
                                </div>
                                <input type="submit" value='登录' onTouchStart={this.login.bind(this)}/>
                            </div>
                            <div className="register section" id={this.state.registerId}>
                                <div>
                                    <label htmlFor="">账户:</label><input type="text" name="username" maxLength="16"/>
                                </div>
                                <div>
                                    <label htmlFor="">密码:</label><input type="password" name="password" maxLength="16"/>
                                </div>
                                <div>
                                    <label htmlFor="">确认密码:</label><input type="password" name="repassword"
                                                                          maxLength="16"/>
                                </div>
                                <input type="submit" value='注册' onTouchStart={this.register.bind(this)}/>
                            </div>
                            <div>
                                <button onTouchStart={this.close.bind(this)}>关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
