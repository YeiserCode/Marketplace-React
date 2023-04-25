import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './Header.module.css';

const Header = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Tienda Código Abierto React
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="cart">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
