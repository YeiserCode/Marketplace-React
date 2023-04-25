import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AppBar, Toolbar, Typography, IconButton, Box, MenuItem, Menu, Button } from '@mui/material';
import { AccountCircle, ShoppingCart, ListAlt, ExitToApp, PersonAdd, Login } from '@mui/icons-material';
import { styled } from '@mui/system';
import SearchBar from './SearchBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [categorias, setCategorias] = useState([]);

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

  useEffect(() => {
    const obtenerCategorias = async () => {
      const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
      const categoriasLista = categoriasSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategorias(categoriasLista);
    };

    obtenerCategorias();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <Button
          aria-controls="categorias-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          Categorías
        </Button>
        <Menu
          id="categorias-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {categorias.map((categoria) => (
            <MenuItem
              key={categoria.id}
              onClick={handleClose}
              component={Link}
              to={`/categorias/${categoria.id}`}
            >
              {categoria.nombre}
            </MenuItem>
          ))}
        </Menu>
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
