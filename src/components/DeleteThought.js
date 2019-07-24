import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

// Material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteThought } from '../redux/actions/dataActions';

const styles = {
  span: {
    color: 'red',
    fontWeight: 900,
    fontSize: '12px'
  },
  deleteButton: {
    position: 'absolute', // card is position relative
    left: '90%',
    bottom: '3%',
    color: '#ff5252'
  },
  deleteThoughtButton: {
    color: 'red',
    fontWeight: 600,
    border: '1px solid red',
    marginLeft: 10
  }
};

export class DeleteThought extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteThought = () => {
    this.props.deleteThought(this.props.thoughtId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tipTitle='Delete Thought'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>
            Are you sure you want to delete this thought? <br />
            <span className={classes.span}>This cannot be undone</span>
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={this.deleteThought}
              className={classes.deleteThoughtButton}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteThought.propTypes = {
  deleteThought: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  thoughtId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteThought }
)(withStyles(styles)(DeleteThought));
