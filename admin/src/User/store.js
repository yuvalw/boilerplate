import { observable, action } from 'mobx';

const userState = observable({
  user: null,
  isAuth: false,
  login: action(user => {
    userState.user = user;
    userState.isAuth = true;
  }),
  logout: action(() => {
    userState.user = null;
    userState.isAuth = false;
  })
});

export default userState;
