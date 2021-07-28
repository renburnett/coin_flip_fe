import axios from 'axios';
import React, { useState } from 'react';
import { Button, Grid, Header, Segment, Statistic } from 'semantic-ui-react';
import Coin from '../components/Coin';
import AuthWrapper from '../util/AuthWrapper';

const Game = ({user, setUser, setJwt}) => {
  const [rotating, setRotating] = useState(false);
  const [result, setResult] = useState('-');
  const [score, setScore] = useState({flips: 0, tokensWon: 0});
  const [gameStarted, setGameStarted] = useState(false);

  const updateUser = async (usr) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/user_auth`, { user: usr });
      const { user, jwt } = data;

      setJwt(jwt);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwt', JSON.stringify(jwt));

    } catch (error) {
      console.error("User update error: ", error);
      alert("Login update error: ", error)
    }
  };

  const handleCoinFlip = () => {
    setRotating(true);
    setResult('...')
    setTimeout(() => {
      setRotating(false);
      headsOrTails();
    }, 1500);
  }

  const markScore = (currentResult) => {
    if (score.tokensWon === 0 && currentResult === 'heads') { /* handle 0 */
      setScore({
        flips: score.flips + 1,
        tokensWon: 1,
       })
    } else if (currentResult === 'heads' && user.coin_flips.at(-1).result === 'heads') {
      setScore({
        flips: score.flips + 1,
        tokensWon: score.tokensWon * 2,
      })
    } else {
      setScore({ 
        flips: score.flips + 1,
        tokensWon: 0,
       })
    }
  }

  const headsOrTails = () => {
    const num = Math.random();
    const userCp = {...user};

    if (num > 0.5) {
      userCp.coin_flips.push({date: Date.now(), result: 'heads'});
      setUser(userCp);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('heads')
      //TODO: update user on backend
      setResult('heads')
      markScore('heads');
    } else {
      userCp.coin_flips.push({date: Date.now(), result: 'tails'});
      setUser(userCp);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('tails');
      //TODO: update user on backend
      setResult('tails')
      markScore('tails');
    }
  }

  const handleStartGame = () => {
    setGameStarted(true);
    const userCp = {...user};

    userCp.tokens[0] -= 5; //TODO: fix dis
    updateUser(userCp);
  }

  const handleCashOut = () => {
    // call to backend to update user
    const userCp = {...user};
    updateUser();
    setGameStarted(false);
  }

  if (gameStarted) {
    return (
      <>
        <Header content="Tap the coin to flip it!"/>
        <Grid verticalAlign='middle' columns={5} centered>
          <Grid.Row>
            <Grid.Column/>
            <Grid.Column/>
            <Grid.Column>
              <Coin rotating={rotating} handleCoinFlip={handleCoinFlip} />
            </Grid.Column>
            <Grid.Column/>
            <Grid.Column/>
          </Grid.Row>
        </Grid>
        <Grid>
        <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
          <Header as="h3" attached='top' textAlign="left" content="Stats" inverted/>
          <Segment attached='bottom'>
            <Statistic.Group size="small" widths={3} >
                <Statistic label='Flips' value={score.flips} />
                { (result === 'heads') 
                  ? 
                  <Statistic label='Result' value={result} color="blue"/> 
                  :
                  <Statistic label='Result' value={result} color="red"/>
                }
                <Statistic label='Tokens' value={score.tokensWon}/>
              </Statistic.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={3}/>
          <Grid.Column width={3}/>
          <Grid.Column width={10}>
            <Button content="Cash Out" fluid color="blue"/>
          </Grid.Column>
          <Grid.Column width={3}/>
        </Grid>
      </>
    )
  }

  return (
    <>
      <Header as="h2" content="Pay 5 tokens to play!" color="pink"/>
        <Grid verticalAlign='middle' columns={3} centered>
          <Grid.Row>
            <Grid.Column/>
            <Grid.Column>
              <Header content="Purse" as="h3" attached="top" inverted/>
              <Segment attached>
              <Statistic.Group widths={1}>
                <Statistic label='Tokens' value={user.tokens}/> 
              </Statistic.Group>
              </Segment>
              <Button content="Play" icon="yen" attached="bottom" color="blue" onClick={handleStartGame}/>
            </Grid.Column>
            <Grid.Column/>
          </Grid.Row>
        </Grid>
    </>
  )
}

export default AuthWrapper(Game);
