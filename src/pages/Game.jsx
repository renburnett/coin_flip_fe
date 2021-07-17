import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Coin from '../components/Coin';
import AuthWrapper from '../util/AuthWrapper';

const Game = () => {
  return (
    <>
      <Header content="Tap the coin to flip it!"/>
      <Grid verticalAlign='middle' columns={5} centered>
        <Grid.Row>
          <Grid.Column/>
          <Grid.Column/>
          <Grid.Column>
            <Coin/>
          </Grid.Column>
          <Grid.Column/>
          <Grid.Column/>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default AuthWrapper(Game);
