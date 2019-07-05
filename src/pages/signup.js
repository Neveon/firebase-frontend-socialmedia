import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
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

const styles = theme => ({
  // from app.js
  ...theme
});

const Signup = props => {
  const { classes } = props;

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    loading: false,
    errors: {}
  });

  const handleSubmit = e => {
    e.preventDefault();
    setForm({ ...form, loading: true });

    const newUserData = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      handle: form.handle
    };

    axios
      .post('/signup', newUserData)
      .then(res => {
        localStorage.setItem('FBIdtoken', `Bearer ${res.data.token}`);
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
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='handle'
            name='handle'
            type='text'
            label='Username'
            className={classes.textField}
            helperText={form.errors.handle}
            error={form.errors.handle ? true : false}
            value={form.handle}
            onChange={onChange}
            fullWidth
          />
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
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={form.errors.confirmPassword}
            error={form.errors.confirmPassword ? true : false}
            value={form.confirmPassword}
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
            className={classes.button}
            disabled={form.loading}
          >
            Signup
            {form.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? <Link to='/login'>Login</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
