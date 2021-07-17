import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AuthWrapper from '../util/AuthWrapper';

const Prizes = () => {
  return (
    <>
      <Header content="Purchase Prizes"/>
      <Grid verticalAlign='middle' columns={5} centered>
        <Grid.Row>
          <Grid.Column/>
          <Grid.Column/>
          <Grid.Column>
            <Header content="prize 01"/>
          </Grid.Column>
          <Grid.Column/>
          <Grid.Column/>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default AuthWrapper(Prizes);
