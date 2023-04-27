import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Tienda Código Abierto React
        </Typography>
        <IconButton color="inherit" aria-label="language" onClick={handleMenuOpen}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.languageMenu}
        >
          <MenuItem onClick={() => handleChangeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => handleChangeLanguage('es')}>Español</MenuItem>
        </Menu>
        <IconButton edge="end" color="inherit" aria-label="cart">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
