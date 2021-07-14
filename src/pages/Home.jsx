import React from 'react';
import { Header } from 'semantic-ui-react';
import AuthWrapper from '../util/AuthWrapper';

const Home = () => {
  return (
    <div>
      <Header content="Home!"/>
    </div>
  )
}

export default AuthWrapper(Home);