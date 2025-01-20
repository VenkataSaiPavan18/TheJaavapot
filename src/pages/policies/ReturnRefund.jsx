import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const ReturnRefund = () => {
  return (
    <Container maxWidth="md" style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#000' }}>
          Refund Policy
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography variant="body1" paragraph>
          Please send an email to <a href="mailto:sales@thejaavapot.com">sales@thejaavapot.com</a> with the reasons for your return and details of the products you wish to return. We will respond to your inquiry within 48 working hours.
        </Typography>
        <Typography variant="body1" paragraph>
          To qualify for a return, the product must be unused, and the request must be made within 2 days of delivery. Please note that return shipment fees are the responsibility of the customer.
        </Typography>
        <Typography variant="body1" paragraph>
          Upon receiving the returned product, we will initiate the refund process, and you can expect to receive your refund within 8-10 working days.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: '#000',fontFamily:'arial' }}>
          Additional Points
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Returns and refunds will not be accepted if the product is damaged." />
          </ListItem>
          <ListItem>
            <ListItemText primary="A valid reason is required for a return." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Proof and evidence such as video recordings and pictures are required to process the return." />
          </ListItem>
          <ListItem>
            <ListItemText primary="This return policy applies only to Ready Cook Products." />
          </ListItem>
          <ListItem>
            <ListItemText primary="There will be no return for Ready to Eat dishes as they are prepared after the order is placed, and we do not accept returns or refunds for them." />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default ReturnRefund;
