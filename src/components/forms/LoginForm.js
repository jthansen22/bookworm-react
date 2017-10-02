import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
  state = { 
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
   };

   onChange = e => 
    this.setState({ 
      data: { ...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      // Can use lodash module __isempty instead or seperate function
      if (Object.keys(errors).length === 0) {
        this.props.submit(this.state.data);
      }
    };

    validate = (data) => {
      const errors = {};
      if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
      if(!data.password) errors.password =  "Password Can't be blank";
      return errors;
    };
  
  render() {
    const { data, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.PropTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;