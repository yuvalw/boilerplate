import { observable, action } from 'mobx';
import { logout } from './actions';

const userState = observable({
  user: null,
  isAuth: false,
  login: action(user => {
    userState.user = user;
    userState.isAuth = true;
  }),
  logout: action(() => {
    logout();
    userState.user = null;
    userState.isAuth = false;
  })
});

export default userState;
