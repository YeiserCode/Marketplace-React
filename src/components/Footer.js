import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="body1" align="center">
            Todos los derechos reservados YeiserCode &copy; 2023
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
