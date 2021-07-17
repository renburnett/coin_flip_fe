import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

const Signup = ({ setUser, setJwt }) => {
  const history = useHistory();
  const [passwordMask, setPasswordMask] = useState('password');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSignupChange = (e, { name, value }) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);

    }
  };

  const createNewUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        {
          user: {
            name,
            email,
            password,
          }
        },
      );
      const { user, jwt } = response.data;

      setUser(user);
      setJwt(jwt);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwt', JSON.stringify(jwt));

      history.push('/');
    } catch (error) {
      alert('signup error:', error);
      console.log('signup error:', error);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Segment>
        <Header 
          content='assimilate!' 
          subheader="we're excited to have you onborg" 
          as='h2'
          color='blue' 
          textAlign='left'
        />
        <Form 
          size='large'
          onSubmit={createNewUser}
        >
          <Form.Input 
            fluid
            name='name'
            icon='edit outline' 
            iconPosition='left' 
            placeholder='name'
            onChange={handleSignupChange}
          />
          <Form.Input 
            fluid
            name='email'
            icon='user' 
            iconPosition='left' 
            placeholder='email'
            onChange={handleSignupChange}
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
              onChange={handleSignupChange}
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
            content='Sign Up' 
            color='blue' 
            fluid size='large'
          />
        </Form>
      </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Signup;