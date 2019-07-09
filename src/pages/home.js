import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Thought from '../components/Thought';

class Home extends Component {
  state = {
    thoughts: null
  };

  componentDidMount() {
    axios
      .get('/thoughts')
      .then(res => {
        this.setState({
          thoughts: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let recentThoughtsMarkup = this.state.thoughts ? (
      this.state.thoughts.map(thought => (
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
          <p>Profile.</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
