import React from 'react';
import { Link } from 'react-router-dom'; // Specifying imports for treeshaking

// @material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        <div className='nav-container'>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
          <Button color='inherit' component={Link} to='/signup'>
            Signup
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
