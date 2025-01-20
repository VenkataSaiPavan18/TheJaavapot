import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#000' }}>
          Privacy Policy
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography variant="body1" paragraph>
          Your privacy is important to us. We, The JaavaPot, take the privacy of your information seriously. This privacy policy explains what personal data we collect from you, through our interactions with you on this website, and how we use that data.
        </Typography>
        <Typography variant="body1" paragraph>
          This privacy policy applies to the website www.thejaavapot.com. Please note that these websites may include links to websites of third parties whose privacy practices differ from those of The JaavaPot. If you provide personal data to any of those websites, then your data is governed by their privacy policy.
        </Typography>
        <Typography variant="body1" paragraph>
          The privacy practices set forth in this privacy policy are for this website only. If you link to other websites or provide personal data to any of those websites, please review the privacy policies posted at those websites.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          Definitions
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Data" secondary="Includes information that you submit to The JaavaPot via the Website." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Cookies" secondary="A small file placed on your computer by this Website when you either visit, or use certain features of, the Website. A cookie generally allows the website to 'remember' your actions or preferences for a certain period of time." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data Protection Laws" secondary="Any applicable law relating to the processing of personal Data, and the Information Technology Act, 2000, as amended or substituted." />
          </ListItem>
          <ListItem>
            <ListItemText primary="The JaavaPot or us" secondary="The JaavaPot, a company incorporated in India whose registered office is at H.NO.16-11-741/D/106, SHALIVAHANA NAGAR, MALAKPET, Hyderabad, Telangana - 500036." />
          </ListItem>
          <ListItem>
            <ListItemText primary="User or you" secondary="The natural person who accesses the Website." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Website" secondary="The website that you are currently using, www.thejaavapot.com, and any sub-domains of this site, unless excluded by their own terms." />
          </ListItem>
        </List>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          Scope
        </Typography>
        <Typography variant="body1" paragraph>
          The JaavaPot collects data to operate this website. You provide some of this data directly, such as when you submit an entry (through the general query, media query, newsletter subscription, or such other manner specified on the website).
        </Typography>
        <Typography variant="body1" paragraph>
          You can visit www.thejaavapot.com without telling us who you are. You can make choices about our collection and use of your data. For example, you may want to access, edit or remove the personal information in the Website or microsite account. When you are asked to provide personal data, you may decline.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          Data Collected
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect information or pieces of information that could allow you to be identified, including:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Contact information" secondary="We collect first and last name, email address, mobile number, and other similar contact data." />
          </ListItem>
          <ListItem>
            <ListItemText primary="While registering with, or ordering from www.thejaavapot.com, you will be required to furnish some information like name – first and last name, address, postal code, e-mail address, mobile number etc." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Non-personally-identifiable information" secondary="We may also collect non-personally-identifiable information such as the IP address, the operating system, type of browser, duration of accessing the website, date and time when the website has been accessed." />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          This information is used by us to personalize your shopping experience, to process your transactions, deliver your orders, process payment, and to make communication regarding your order and/or our products and services.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          How we Collect Data
        </Typography>
        <Typography variant="body1" paragraph>
          We collect Data in the following ways:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Data given to us by you" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data collected automatically pursuant to your visit to the Website" />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          MAIPL may collect your Data in several ways from your use of this Website. For instance:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="When you contact us through the Website (through any form, e-mail address, hyperlink or social media address posted therein)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="When you register with us to receive our products, services, and/or newsletters" />
          </ListItem>
          <ListItem>
            <ListItemText primary="When you complete surveys conducted by or for us" />
          </ListItem>
          <ListItem>
            <ListItemText primary="When you enter a competition or promotion" />
          </ListItem>
          <ListItem>
            <ListItemText primary="When you elect to receive any communications (including any newsletter, promotional offers) from us" />
          </ListItem>
          <ListItem>
            <ListItemText primary="From the information gathered by your visit to our webpages" />
          </ListItem>
        </List>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          Data that is Collected Automatically
        </Typography>
        <Typography variant="body1" paragraph>
          We automatically collect some information about your visit to the Website. This information helps us to make improvements to Website content and navigation and includes your IP address and the way you use and interact with its content.
        </Typography>
        <Typography variant="body1" paragraph>
          Our web servers or affiliates who provide analytics and performance enhancement services collect IP address, operating system details, browsing details, device details, and language settings. This information is aggregated to measure the number of visits, average time spent on the site, pages viewed and similar information ("aggregate data"). MAIPL uses this information to measure the site usage, improve content, and to ensure safety and security, as well as enhance the performance of the Website.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          Our Use of Data
        </Typography>
        <Typography variant="body1" paragraph>
          Any or all the above Data may be required by us from time to time to provide information relating to MAIPL and to work on the experience when using our Website. Specifically, Data may be used by us for the following reasons:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="To fulfill the order/delivery/service you have purchased" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Improvement of our products or services, as well as of our group entities" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Transmission by email or any other form of communication of marketing materials to you" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Contact for survey or feedback which may be done using email or mail" />
          </ListItem>
          <ListItem>
            <ListItemText primary="To enable our group entities to reach out to you in relation to their programs managed by them/products or services offered by them" />
          </ListItem>
          <ListItem>
            <ListItemText primary="To process your requests (such as replying to your queries)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="To ensure that content from our Website is presented most effectively to you and your computer." />
          </ListItem>
        </List>
<div>
        <h3>
        User Control:<br/> </h3>
        <p>
- Users have full control over their data and can access, update, or delete their information at any time. <br/>
- To delete their account and associated data, users can use the provided account deletion feature within the app. <br/>
- Upon account deletion, all user data will be permanently removed from our servers.</p>
</div>     
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
