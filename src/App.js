import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : undefined)
  const [jwt, setJwt] = useState(localStorage.jwt ? JSON.parse(localStorage.jwt) : undefined) 

  return (
    <div className="App">
        <Navbar/>
        <Switch>
        <Route exact path='/login' render={(props) => <Login key='login' setUser={setUser} setJwt={setJwt}/>}/>
        <Route exact path='/game' render={(props) => <Game key='game'/>}/>
        <Route exact path='/profile' render={(props) => <Profile key='profile'/>}/>
        <Route exact path='/signup' render={(props) => <Signup key='signup' setUser={setUser} setJwt={setJwt}/>}/>
        <Route exact path='/' render={(props) => <Home key='home'/>}/>
        {/* <Route path="/questions/:questionId" exact render={(props) => <QuestionShowPage key={`questions:${props.match.params.questionId}`}/>} /> */}
        </Switch>
    </div>
  );
}

export default App;
