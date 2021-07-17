
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = ({setUser, setJwt}) => {
  const [passwordMask, setPasswordMask] = useState('password');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`http://localhost:3000/user_auth`, { user: { email, password } });
      const { user, jwt } = data;

      setJwt(jwt);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwt', JSON.stringify(jwt));

      history.push("/");
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Login Error: ", error)
    }
  };

  const handleLoginChange = (e, { name, value }) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header 
            content='coinflip!' 
            subheader='a coinflipping game where you win tokens' 
            as='h2'
            color='blue' 
            textAlign='left'
          />
          <Form 
            size='large'
            onSubmit={handleLogin}
          >
            <Form.Input 
              fluid
              name='email'
              icon='user' 
              iconPosition='left' 
              placeholder='geordi_la_forge@enterprise.sf'
              onChange={handleLoginChange}
            />
            <Form.Group widths={16}>
              <Form.Input
                fluid
                icon='lock'
                name='password'
                iconPosition='left'
                placeholder='p4$$w0rd'
                type={passwordMask}
                width={14}
                onChange={handleLoginChange}
              />
              <Button
                type='button'
                width={2} 
                icon='eye'
                toggle
                color={!passwordMask ? 'grey' : 'vk'}
                onClick={() => passwordMask === 'password' ? setPasswordMask(undefined) : setPasswordMask('password')}
              />
            </Form.Group>
            <Button
              type='submit'
              content='Login' 
              color='teal' 
              fluid size='large'
            />
          </Form>
        </Segment>
        <Message>
          Never been here before? <Link to='/signup'> Sign Up! </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login