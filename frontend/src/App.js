import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/User';
import Movie from './movie/pages/Movie';
import Menu from './menu/Menu';
import Signup from './signup/signup';
import Login from './login/login';



class  App extends React.Component {
  render(){
  return( 
    <Router>
          <Menu />
          <div className="container">
            <Switch>
            <Route path="/users" exact > <Users/> </Route>
            <Route path="/" exact > <Movie/> </Route>
            <Route path="/signup" exact > <Signup/> </Route>
            <Route path="/login" exact > <Login/> </Route>
            <Redirect to="/" />
          </Switch>
          </div>
    </Router>)
   }
}

export default App;