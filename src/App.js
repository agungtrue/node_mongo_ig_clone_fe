import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
// import './style.scss';
// import M from 'materialize-css';
import Home from './components/page/Home';
import Login from './components/page/Login';
import Profile from './components/page/Profile';
import Signup from './components/page/Signup';
import CreatePost from './components/page/CreatePost';
import Site from './components/page2/Site';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      console.info({ user })
      dispatch({type: 'user', payload: user});
    }
    else {
      history.push('/login');
    }
  }, [dispatch, history])
    return (
      <Switch>
        <Route exact path="/">
        <Home/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
      </Switch>
    );
}

const NewSite = () => {
  return (
    <Switch>
      <Route path="/site">
          <Site/>
      </Route>
    </Switch>
  )
}

function App() {
  const [stateReducer, dispatchReducer] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state: stateReducer, dispatch: dispatchReducer }}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
        {/* <NewSite/> */}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
