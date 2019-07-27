import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  ...theme,
  card: {
    display: 'flex',
    marginBottom: 20
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    minWidth: 200,
    minHeight: 150,
    objectFit: 'cover' // prevent image stretch/shrink
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 85,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    marginBottom: 5
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '45%',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    marginBottom: 10
  }
});

const ThoughtSkeleton = props => {
  const { classes } = props;

  // Array.from similar to for loop
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ThoughtSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThoughtSkeleton);
