import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Kitchen Staff Dashboard</Typography>
    <Typography variant="body1" color="textSecondary" sx={{ mt: 4 }}>
      No data available. Please integrate with real data source.
    </Typography>
  </Box>
);

export default Dashboard; 