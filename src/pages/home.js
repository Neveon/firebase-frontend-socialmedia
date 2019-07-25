import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Thought from '../components/thought/Thought';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getThoughts } from '../redux/actions/dataActions';

class Home extends Component {
  state = {
    thoughts: null
  };

  componentDidMount() {
    this.props.getThoughts();
  }

  render() {
    const { thoughts, loading } = this.props.data;
    let recentThoughtsMarkup = !loading ? (
      thoughts.map(thought => (
        <Thought key={thought.thoughtId} thought={thought} />
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentThoughtsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getThoughts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getThoughts }
)(Home);
