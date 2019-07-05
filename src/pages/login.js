import React, { useState } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/thought.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 20px auto'
  },
  button: {
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    margin: 5
  },
  progress: {
    position: 'absolute'
  }
};

const Login = props => {
  const { classes } = props;

  const [form, setForm] = useState({
    email: '',
    password: '',
    loading: false,
    errors: {}
  });

  const handleSubmit = e => {
    e.preventDefault();
    setForm({ ...form, loading: true });

    const userData = {
      email: form.email,
      password: form.password
    };

    axios
      .post('/login', userData)
      .then(res => {
        console.log(res.data);
        setForm({ ...form, loading: false });
        props.history.push('/');
      })
      .catch(err => {
        setForm({ ...form, errors: err.response.data, loading: false });
      });
  };

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='thoughtBubble' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={form.errors.email}
            error={form.errors.email ? true : false}
            value={form.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={form.errors.password}
            error={form.errors.password ? true : false}
            value={form.password}
            onChange={onChange}
            fullWidth
          />
          {form.errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {form.errors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            classname={classes.button}
            disabled={form.loading}
          >
            Login
            {form.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
