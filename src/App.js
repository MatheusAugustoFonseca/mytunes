import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Loading from './components/Loading';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/:edit" component={ ProfileEdit } />
        <Route exact path="/loading" component={ Loading } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
