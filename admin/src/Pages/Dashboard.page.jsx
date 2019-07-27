import React, { useEffect } from 'react';
import axios from 'axios';

const Dashboard = props => {
  const handleLogout = () => {
    axios
      .post('api/admin/logout')
      .then(() => props.user.logout())
      .catch(() => props.user.logout());
  };

  useEffect(() => {
    console.log(props.user.user);
  });

  return (
    <div>
      <h5>{props.user.user.nickname}</h5>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
