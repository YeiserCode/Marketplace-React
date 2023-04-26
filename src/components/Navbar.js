import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  MenuItem,
  Menu,
  Drawer,
  List,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { ShoppingCart, ListAlt, ExitToApp, PersonAdd, Login, Category, Menu as MenuIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/system';
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderMenuItems = () => (
    <>
      <MenuItem
        component={Link}
        to="/productos"
        onClick={() => {
          if (isMobile) handleDrawerToggle();
        }}
      >
        <ListAlt />
        Productos
      </MenuItem>
      <MenuItem
        component={Link}
        to="/carrito"
        onClick={() => {
          if (isMobile) handleDrawerToggle();
        }}
      >
        <ShoppingCart />
        Carrito
      </MenuItem>
      {user ? (
        <>
          <MenuItem
            onClick={() => {
              handleLogout();
              if (isMobile) handleDrawerToggle();
            }}
          >
            <ExitToApp />
            Cerrar sesión
          </MenuItem>
          </>
      ) : (
        <>
          <MenuItem
            component={Link}
            to="/register"
            onClick={() => {
              if (isMobile) handleDrawerToggle();
            }}
          >
            <PersonAdd />
            Registrarse
          </MenuItem>
          <MenuItem
            component={Link}
            to="/login"
            onClick={() => {
              if (isMobile) handleDrawerToggle();
            }}
          >
            <Login />
            Iniciar sesión
          </MenuItem>
        </>
      )}
    </>
  );

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>
          <StyledLink to="/">Mi Tienda</StyledLink>
        </Typography>
        <SearchBar onChange={onSearch} sx={{ flexGrow: 1 }} />
        <StyledLink onClick={handleClick} color="inherit" sx={{ ml: 2 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Category />
            <Typography sx={{ mt: 0.5 }}>Categorías</Typography>
          </Box>
        </StyledLink>
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
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              <List>
                <Divider />
                {renderMenuItems()}
              </List>
            </Drawer>
          </>
        ) : (
          renderMenuItems()
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
