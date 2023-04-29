import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
} from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5',
});

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginRight: 10,
});

const Navbar = () => {
  const { t } = useTranslation();

  const renderMenuItems = () => (
    <>
      <MenuItem
        component={Link}
        to="/productos"
      >
        <ListAlt />
        {t('products')}
      </MenuItem>
    </>
  );

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>
          <StyledLink to="/">{t('myStore')}</StyledLink>
        </Typography>
        {renderMenuItems()}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
