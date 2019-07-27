import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = observer(props => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeUsername = e => {
    console.log('e', e);
    setUsername(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const validate = () => {
    if (username === '' || password === '') return false;
    return true;
  };
  const handleSubmit = () => {
    if (!validate()) {
      setError('Must fill all');
      return;
    }
    axios
      .post('api/admin/login', { username, password })
      .then(({ data }) => {
        if (data.success) {
          props.user.login(data.user);
        } else {
          setError('incorrect');
        }
      })
      .catch(err => console.log(err));
  };
  const { user } = props;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            label="username"
            onChange={handleChangeUsername}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            label="Password"
            type="password"
            onChange={handleChangePassword}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Typography component="h5" variant="h5">
            {error}
          </Typography>
        </div>
      </div>
    </Container>
  );
});

export default SignIn;
