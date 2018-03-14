import React from "react";
import {Row,Col,Menu, Icon,Button,Modal,Form,Input,Tabs,message} from "antd";
import NewsLogo from "../../../img/iwennews.png";
import {Router,Route,browserHistory,Link} from "react-router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Header extends React.Component{
  constructor(){
    super();
    this.state={
      current:"top",
      hasLogined:false,
      userNickName:"未知",
      modalVisible:false,
      action:"login",
      password:""
    }
  }

  //当用户进入页面时候判断是否存在用户名
  componentWillMount(){
    if(localStorage.getItem("userNickName") != null){
      this.setState({
        hasLogined:true,
        userNickName:localStorage.getItem("userNickName"),
        password:localStorage.getItem("password")
      })
    }
  }

  //menu点击事件
  handlerClickMenu(event){
    if(event.key == "register"){
			this.setState({
				current:"register"
			});
      this.setModalVisible(true);
		}else{
			this.setState({
				current:event.key
			})
		}
  }
  //控制登录注册框显示与隐藏
  setModalVisible(value){
    this.setState({
      modalVisible:value
    })
  }

  //获取用户输入信息
  handlerSubmit(event){
    event.preventDefault();
    var formData = this.props.form.getFieldsValue();
    //判断你点击的是注册还是登录
    if(this.state.action == "login"){
      //登录
      var myFetchOptions = {
        method:"GET"
      }
      fetch("http://www.iwen.wiki/sxtstu/news/selectuser.php?username="+formData.userName+"&password="+formData.password,myFetchOptions)
      .then(response=>response.json())
      .then(json=>{
        this.setState({
          hasLogined:true,
          userNickName:json.username,
          password:json.password,
        })
        localStorage.setItem("userNickName",json.username);
        localStorage.setItem("password",json.password);
      })
    }else if(this.state.action == "register"){
      //注册
      var myFetchOptions = {
        method:"GET"
      }
      fetch("http://www.iwen.wiki/sxtstu/news/adduser.php?username="+formData.r_userName+"&password="+formData.r_password+"&repassword="+formData.r_confirmpassword,myFetchOptions)
    }
    message.success("请求成功");
    this.setModalVisible(false);
  }
  //判断当前模态框是登录还是注册
  callback(key){
   if(key == "1"){
     this.setState({
       action:"login"
     })
   }else if(key == "2"){
     this.setState({
       action:"register"
     })
   }
 }

 //登出
 logout(){
   this.setState({
     hasLogined:false
   })
   localStorage.clear();
 }

  render(){
    //接受页面次参数
    var {getFieldProps} = this.props.form;
    //判断用户是否已登录来决定加载那个视图
    var userShow = this.state.hasLogined
    ?
    <Menu.Item key="logout" className="header-login">
       <Button type="primary">{this.state.userNickName}</Button>
       <Button type="dashed">个人中心</Button>
       <Button type="ghost" onClick={this.logout.bind(this)}>退出</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" className="header-login" >
     登陆／注册
    </Menu.Item>
    return(
        <div>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
              <Row>
                <Col span={1}>
                  <div className="header-logo">
                    <a href="#">
                      <img src={NewsLogo} />
                    </a>
                  </div>
                </Col>
                <Col span={22}>
                  <Menu className="header-menu" onClick={this.handlerClickMenu.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="top">
                        <Link to={`/nav/${"top"}/${30}`}>
                          <Icon type="to-top" />
                          头条
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="yule">
                      <Link to={`/nav/${"yule"}/${30}`}>
                        <Icon type="smile-o" />
                        娱乐
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="guonei">
                      <Link to={`/nav/${"guonei"}/${30}`}>
                        <Icon type="home" />
                        国内
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="guoji">
                      <Link to={`/nav/${"guoji"}/${30}`}>
                          <Icon type="global" />
                          国际
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="tiyu">
                      <Link to={`/nav/${"tiyu"}/${30}`}>
                        <Icon type="skin" />
                        体育
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="shehui">
                      <Link to={`/nav/${"shehui"}/${30}`}>
                        <Icon type="usergroup-add" />
                        社会
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="shishang">
                      <Link to={`/nav/${"shishang"}/${30}`}>
                        <Icon type="usergroup-add" />
                        时尚
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="keji">
                      <Link to={`/nav/${"keji"}/${30}`}>
                        <Icon type="usergroup-add" />
                        科技
                      </Link>
                    </Menu.Item>
                    {userShow}
                   </Menu>
                   <Modal title="用户中心" wrapClassName="vertial-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
      							<Tabs type="card" onChange={this.callback.bind(this)}>
      								<TabPane tab="登陆" key="1">
      									<Form horizontal onSubmit={this.handlerSubmit.bind(this)}>
      										<FormItem label="账户">
      											<Input placeholder="请输入您的账号" {...getFieldProps("userName")} />
      										</FormItem>
      										<FormItem label="密码">
      											<Input type="password" placeholder="请输入您的密码" {...getFieldProps("password")} />
      										</FormItem>
      										<Button type="primary" htmlType="submit">登陆</Button>
      									</Form>
      								</TabPane>
      								<TabPane tab="注册" key="2">
      									<Form horizontal onSubmit={this.handlerSubmit.bind(this)}>
      										<FormItem label="账户">
      											<Input placeholder="请输入您的账号" {...getFieldProps("r_userName")} />
      										</FormItem>
      										<FormItem label="密码">
      											<Input type="password" placeholder="请输入您的密码" {...getFieldProps("r_password")} />
      										</FormItem>
      										<FormItem label="确认密码">
      											<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps("r_confirmpassword")} />
      										</FormItem>
      										<Button type="primary" htmlType="submit">注册</Button>
      									</Form>
      								</TabPane>
      							</Tabs>
      						</Modal>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
    )
  }
}

export default Header = Form.create({})(Header);
