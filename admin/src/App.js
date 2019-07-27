import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./Pages/Dashboard.page'));
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
        {appState.isAuth && (
          <Route
            path="/"
            render={props => <Dashboard {...props} user={appState} />}
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
