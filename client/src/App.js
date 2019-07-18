import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    user: false
  };
  async getUser() {
    const res = await axios.get('/api/currentUser', { withCredentials: true });
    console.log('getUser', res);
    this.setState({ user: res.data });
  }

  login = async () => {
    const res = await axios.post('api/login', {
      username: 'yuval',
      password: '123'
    });
    this.setState({ user: res.data });
  };

  logOut = async () => {
    const res = await axios.post('/api/logout');
    this.setState({ user: undefined });
  };

  componentDidMount() {
    //this.getUser();
  }

  renderLoggedUser() {
    return (
      <div>
        <button onClick={this.logOut}>Log Out</button>;
        {this.state.user.username}{' '}
      </div>
    );
  }

  renderLogin() {
    return <button onClick={this.login}>Log in</button>;
  }
  render() {
    return (
      <div>
        {this.state.user ? this.renderLoggedUser() : this.renderLogin()}
      </div>
    );
  }
}
export default App;
