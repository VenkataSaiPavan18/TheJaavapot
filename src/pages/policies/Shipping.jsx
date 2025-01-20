import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Shipping = () => {
  return (
    <Container maxWidth="md" style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#000' }}>
          Shipping Policy
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography variant="body1" paragraph>
          Any Order Value below Rs.249, the shipping charge will be - Rs.40/-
        </Typography>
        <Typography variant="body1" paragraph>
          Any Order Value between Rs.250 - 499, the shipping will be - Rs.60/-
        </Typography>
        <Typography variant="body1" paragraph>
          Any Order Value between Rs.500 - 999, the shipping will be - Rs.80/-
        </Typography>
        <Typography variant="body1" paragraph>
          All orders above Rs.1000/- will be free.
        </Typography>
        <Typography variant="body1" paragraph>
          Orders are processed within 2-3 days of receipt. Delivery timeline is 2-10 days.
        </Typography>
        <Typography variant="body1" paragraph>
          If delayed due to unforeseen circumstances, please raise a ticket to <a href="mailto:sales@thejaavapot.com">sales@thejaavapot.com</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default Shipping;
