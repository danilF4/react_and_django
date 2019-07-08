import React from 'react'
import axios from 'axios'
import { Form, Input, Button, Spin, Icon, message } from 'antd';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions/auth'

import Navigation from '../components/Navigation'

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount(){
    console.log(localStorage)
    axios.get('http://127.0.0.1:8000/api/categories/')
    .then(res => {
      this.setState({
        categories: res.data
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password)
        console.log(this.props.loading)
        localStorage.setItem('email', values.email)
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      
      <div style={{ backgroundColor: '#FAFAFA' }}>
      <Navigation categories={this.state.categories} props={this.props}/>
        <br/>
        <div className="section" style={{ paddingTop: '0px' }}>
          <div className="container" style={{ border: '1px #ddd solid' }}>
            <div className="row" style={{ backgroundColor: '#fff' }}>
              <div className="col-lg-offset-2 col-lg-8">
                <div className="login-form-div">
                  <div className="login-form-title">Login Form</div>
                    {
                      this.props.loading ?

                    <Spin indicator={antIcon} />

                    :

                    <Form onSubmit={this.handleSubmit} className="login-form">

                      <FormItem>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                      )}
                      </FormItem>

                      <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" autocomplete="password" />
                      )}
                      </FormItem>

                      <FormItem>
                      <div className="button-or-signup">
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                          Login
                        </Button>
                      Or 
                        <NavLink 
                          style={{marginRight: '10px'}} 
                          to='/signup/'> signup
                        </NavLink>
                      </div>
                      </FormItem>
                    <br/>
                    </Form>
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login)

const mapStateToProps = (state) => {
  return {
    loading:state.loading,
    error:state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authLogin(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)