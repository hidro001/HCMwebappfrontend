import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 py-3">
      <Container maxWidth="lg">
        <div className="text-center ">
          <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Razor Infotech Pvt Ltd || Privacy Policy || Terms of Service
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
