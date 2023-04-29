import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AppBar, Toolbar, Typography, IconButton, Box, MenuItem, Menu, Drawer, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCart, Favorite, ExitToApp, PersonAdd, Login, Category, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import SearchBar from '../search/SearchBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';
import LanguageIcon from '@mui/icons-material/Language';
import { Hidden } from '@mui/material';

import styles from './Header.module.css';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5',
});

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginRight: 10,
});

const Header = ({ onSearch }) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [anchorElCategories, setAnchorElCategories] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    setAnchorElLanguage(null);
  };

  const handleMenuOpen = (menu) => (event) => {
    if (menu === 'language') {
      setAnchorElLanguage(event.currentTarget);
    } else if (menu === 'categories') {
      setAnchorElCategories(event.currentTarget);
    }
  };

  const handleMenuClose = (menu) => () => {
    if (menu === 'language') {
      setAnchorElLanguage(null);
    } else if (menu === 'categories') {
      setAnchorElCategories(null);
    }
  };

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
      dispatch(clearUser());
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 0, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <StyledLink to="/">{t('myStore')}</StyledLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <StyledLink onClick={handleMenuOpen('categories')} color="inherit" sx={{ ml: 2 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Category />
                <Typography sx={{ mt: 0.5 }}>{t('categories')}</Typography>
              </Box>
            </StyledLink>
            <SearchBar onChange={onSearch} sx={{ marginLeft: '10px' }} />
          </Box>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMobileMenu}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <IconButton color="inherit" aria-label="language" onClick={handleMenuOpen('language')}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElLanguage}
            open={Boolean(anchorElLanguage)}
            onClose={handleMenuClose('language')}
            className={styles.languageMenu}
          >
            <MenuItem onClick={() => handleChangeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => handleChangeLanguage('es')}>Español</MenuItem>
          </Menu>
          <Menu
            id="categorias-menu"
            anchorEl={anchorElCategories}
            keepMounted
            open={Boolean(anchorElCategories)}
            onClose={handleMenuClose('categories')}
          >
            {categorias.map((categoria) => (
              <MenuItem
                key={categoria.id}
                onClick={handleMenuClose('categories')}
                component={Link}
                to={`/categorias/${categoria.id}`}
              >
                {categoria.nombre}
              </MenuItem>
            ))}
          </Menu>
          <Hidden mdDown>
            <IconButton color="inherit">
              <StyledLink to="/favoritos">
                <Favorite />
              </StyledLink>
            </IconButton>
            <IconButton color="inherit">
              <StyledLink to="/carrito">
                <ShoppingCart />
              </StyledLink>
            </IconButton>
          </Hidden>
          {user ? (
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          ) : (
            <>
              <Hidden mdDown>
                {user ? (
                  <IconButton color="inherit" onClick={handleLogout}>
                    <ExitToApp />
                  </IconButton>
                ) : (
                  <>
                    <IconButton color="inherit" component={Link} to="/register">
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <PersonAdd />
                        <Typography sx={{ fontSize: '0.75rem' }}>{t('signUp')}</Typography>
                      </Box>
                    </IconButton>
                    <IconButton color="inherit" component={Link} to="/login">
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Login />
                        <Typography sx={{ fontSize: '0.75rem' }}>{t('signIn')}</Typography>
                      </Box>
                    </IconButton>
                  </>
                )}
              </Hidden>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={() => setMobileMenuOpen(false)}
        >
          <ListItem button onClick={handleMenuOpen('categories')}>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary={t('categories')} />
          </ListItem>
          {/* menu. */}

          <ListItem button component={Link} to="/favoritos">
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary={t('favorites')} />
          </ListItem>

          <ListItem button component={Link} to="/carrito">
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary={t('cart')} />
          </ListItem>

          {user ? (
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText primary={t('signIn')} />
              </ListItem>

              <ListItem button component={Link} to="/register">
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary={t('signUp')} />
              </ListItem>
            </>
          )}

        </Box>
      </Drawer>
    </>
  );
};

export default Header;
