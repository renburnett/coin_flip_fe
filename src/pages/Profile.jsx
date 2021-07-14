import React from 'react';
import { Header } from 'semantic-ui-react';
import AuthWrapper from '../util/AuthWrapper';

const Profile = () => {
  return (
    <div>
      <Header content="Profile!"/>
    </div>
  )
}

export default AuthWrapper(Profile);