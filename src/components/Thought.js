import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteThought from './DeleteThought';

// Material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeThought, unlikeThought } from '../redux/actions/dataActions';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

const Thought = props => {
  const {
    classes,
    user: {
      likes,
      authenticated,
      credentials: { handle }
    },
    likeThought,
    unlikeThought,
    thought: {
      body,
      createdAt,
      userImage,
      userHandle,
      thoughtId,
      likeCount,
      commentCount
    }
  } = props;

  const likedThought = () => {
    if (likes && likes.find(like => like.thoughtId === thoughtId)) {
      return true;
    } else return false;
  };

  const userLike = () => {
    likeThought(thoughtId);
  };

  const userUnlike = () => {
    unlikeThought(thoughtId);
  };

  const likeButton = !authenticated ? (
    <MyButton tipTitle='like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </MyButton>
  ) : likedThought() ? (
    <MyButton tipTitle='Unlike' onClick={userUnlike}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tipTitle='Like' onClick={userLike}>
      <FavoriteBorder color='primary' />
    </MyButton>
  );

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteThought thoughtId={thoughtId} />
    ) : null;

  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Profile Image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        {likeButton}
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
      </CardContent>
    </Card>
  );
};

Thought.propTypes = {
  user: PropTypes.object.isRequired,
  likeThought: PropTypes.func.isRequired,
  unlikeThought: PropTypes.func.isRequired,
  thought: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { likeThought, unlikeThought }
)(withStyles(styles)(Thought));
