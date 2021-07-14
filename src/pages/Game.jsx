import React from 'react';
import { Header } from 'semantic-ui-react';
import AuthWrapper from '../util/AuthWrapper';

const Game = () => {
  return (
    <div>
      <Header content="Game!"/>
    </div>
  )
}

export default AuthWrapper(Game);