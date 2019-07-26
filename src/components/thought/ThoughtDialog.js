import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { getThought, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover' //If ratio doesn't match then cover doesn't stretch the image
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  enlargeButton: {
    position: 'absolute',
    left: '90%',
    top: '3%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40
  }
});

class ThoughtDialog extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    // passed from user -> thought -> props
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getThought(this.props.thoughtId); // request to server to get thought details
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    // thought from redux state
    const {
      classes,
      thought: {
        thoughtId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      ui: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleRule} />
          <Typography variant='body1' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleRule} />
          <Typography variant='body1'>{body}</Typography>
          <LikeButton thoughtId={thoughtId} />
          {likeCount === 0 || likeCount > 1 ? (
            <span>{likeCount} likes </span>
          ) : (
            <span>{likeCount} like</span>
          )}
          <MyButton tipTitle='comment'>
            <ChatIcon color='primary' />
          </MyButton>
          {commentCount === 0 || commentCount > 1 ? (
            <span> {commentCount} comments </span>
          ) : (
            <span>{commentCount} comment</span>
          )}
        </Grid>
        <hr className={classes.visibleRule} />
        <CommentForm thoughtId={thoughtId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tipTitle='Enlarge Post'
          tipClassName={classes.enlargeButton}
        >
          <UnfoldMore color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tipTitle='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ThoughtDialog.propTypes = {
  getThought: PropTypes.func.isRequired,
  thoughtId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  thought: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  thought: state.data.thought,
  ui: state.ui
});

const mapActionsToProps = {
  getThought,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ThoughtDialog));
