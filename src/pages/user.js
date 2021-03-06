import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Thought from '../components/thought/Thought';
import StaticProfile from '../components/profile/StaticProfile';
import ThoughtSkeleton from '../util/ThoughtSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

// MUI
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

export class user extends Component {
  state = {
    profile: null,
    thoughtIdParam: null
  };

  componentDidMount() {
    // React Router sends the extra prop 'match' down to the route component we access here
    const handle = this.props.match.params.handle;
    const thoughtId = this.props.match.params.thoughtId; // Undefined if only on user's page

    if (thoughtId) {
      this.setState({
        thoughtIdParam: thoughtId
      });
    }

    this.props.getUserData(handle); // sets thoughts
    axios
      .get(`/user/${handle}`) // sets static profile state
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { thoughts, loading } = this.props.data;
    const { thoughtIdParam } = this.state;

    const thoughtsMarkup = loading ? (
      <ThoughtSkeleton />
    ) : thoughts === null ? (
      <p>No thoughts from this user</p>
    ) : !thoughtIdParam ? (
      thoughts.map(thought => (
        <Thought key={thought.thoughtId} thought={thought} />
      ))
    ) : (
      thoughts.map(thought => {
        if (thought.thoughtId !== thoughtIdParam) {
          return <Thought key={thought.thoughtId} thought={thought} />;
        } else {
          return (
            <Thought key={thought.thoughtId} thought={thought} openDialog />
          );
        }
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {thoughtsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
