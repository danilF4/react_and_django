import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import Smth from '../components/Smth'
import Navigation from '../components/Navigation'

const FormItem = Form.Item;

class Signup extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
            values.email,
            values.password,
            values.confirm
        );
        this.props.history.push('/');
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ backgroundColor:'#FAFAFA' }}>
      <div className="section">
      <div className="container" style={{ border: '1px #ddd solid' }}>
      <div className="row" style={{ backgroundColor:'#fff'  }}>
      <div className="col-lg-offset-2 col-lg-7">
      <div className="login-form-div">
      <div className="login-form-title">Signup Form</div>
      <Form onSubmit={this.handleSubmit}>   
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" autocomplete="email" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" autocomplete="password1" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" autocomplete="password2" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem>
        <div className="button-or-signup">
        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
            Signup
        </Button>
        Or 
        <NavLink 
            style={{marginRight: '10px'}} 
            to='/login/'> login
        </NavLink>
        </div>
        </FormItem>

      </Form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Signup);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password1, password2) => dispatch(actions.authSignup(email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);