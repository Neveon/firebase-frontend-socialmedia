import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Thought from '../components/Thought';

const Home = () => {
  const [thoughts, setThoughts] = useState(null);

  useEffect(() => {
    axios
      .get('/thoughts')
      .then(res => {
        setThoughts(res.data);
      })
      .catch(err => {
        console.error(err);
        // eslint-disable-next-line
      });
  }, []);

  let recentThoughtsMarkup = thoughts ? (
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
        <p>Profile.</p>
      </Grid>
    </Grid>
  );
};

export default Home;
