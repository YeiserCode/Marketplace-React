import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { AccountCircle, ShoppingCart, ListAlt, ExitToApp, PersonAdd, Login } from '@mui/icons-material';
import { styled } from '@mui/system';
import SearchBar from './SearchBar';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5',
});

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginRight: 10,
});

const Navbar = ({ onSearch }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">Mi Tienda</StyledLink>
        </Typography>
        <IconButton color="inherit">
          <StyledLink to="/productos">
            <ListAlt />
            <Typography>Productos</Typography>
          </StyledLink>
        </IconButton>
        <IconButton color="inherit">
          <StyledLink to="/carrito">
            <ShoppingCart />
            <Typography>Carrito</Typography>
          </StyledLink>
        </IconButton>
        <SearchBar onChange={onSearch} />
        {user ? (
          <Box display="flex" alignItems="center">
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography>{user.displayName}</Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
              <Typography>Cerrar sesión</Typography>
            </IconButton>
          </Box>
        ) : (
          <>
            <IconButton color="inherit">
              <StyledLink to="/register">
                <PersonAdd />
                <Typography>Registrarse</Typography>
              </StyledLink>
            </IconButton>
            <IconButton color="inherit">
              <StyledLink to="/login">
                <Login />
                <Typography>Iniciar sesión</Typography>
              </StyledLink>
            </IconButton>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
