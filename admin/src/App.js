import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

const Home = lazy(() => import('./Pages/Home.page'));
const LoginPage = lazy(() => import('./Pages/Login.page'));

const App = observer(({ appState }) => {
  const [isLoading, setIsLoading] = useState(true);

  const isuserLogged = async () => {
    try {
      const res = await axios('api/admin/currentUser');
      res.data.success && appState.login(res.data.user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isuserLogged();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <CssBaseline />
        {appState.isAuth && (
          <Route
            path="/"
            render={props => <Home {...props} user={appState} />}
          />
        )}
        {!appState.isAuth && (
          <Route
            path="/"
            render={props => <LoginPage {...props} user={appState} />}
          />
        )}
      </Suspense>
    </Router>
  );
});

export default App;
