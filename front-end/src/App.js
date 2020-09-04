import React, { useEffect, useState } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import Welcome from './Components/Welcome';
import About from './Components/About';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import './App.css';

// WHAT IS GOING ON WITH THE SPREAD? 
// ...rest = however many arguments we have here, spread em
// ...props = same for the props 
// get info about whatever information was passed in
// this is just a component. we do not know which component it will end up being
// I can pass ten props in, ...rest will get me access to all of it.
// without the rest object, when you do ... it adds each key value pair into the object
const PrivateRoute = ({component: Component, ...rest}) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
    // when we hit this private route we want to return a Component
    // when we use ...props we can access the props directly. instead of a bunch of nested stuff
    // when we say Component, we are not passing in the same Component we extend class components from
    // THIS COMPONENT IS A PARAMETER WE PASSED IN!!!!!
    return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
  }} 
  />
}

function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState('');
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, [])

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtTowken')
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User', currentUser);
  console.log('Authenticated', isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated}/>
      <div className="container mt-5">
        <Switch>
          <Route path="/signup" component={ Signup }/>
          <Route path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} 
            setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} 
          />
          <Route path="/about" component={About}/>
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} />
          <Route exact path="/" component={ Welcome } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
