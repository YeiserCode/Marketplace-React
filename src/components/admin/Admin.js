import React, { useState } from 'react';
import AgregarProductos from './AddProducts';
import AgregarCategoria from './AddCategory';
import DashboardOverview from './DashboardOverview';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';

const drawerWidth = 240;

const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
}));

const Admin = ({ productos, categorias }) => {
  const [selectedMenu, setSelectedMenu] = useState('dashboardOverview');

  const menuItems = [
    { label: 'Dashboard', value: 'dashboardOverview' },
    { label: 'Agregar Producto', value: 'agregarProducto' },
    { label: 'Agregar Categoría', value: 'agregarCategoria' },
  ];

  return (
    <Box sx={{ display: 'flex', paddingTop: '64px' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '225px',
          },
        }}
      >
        <Typography variant="h6" component="div" sx={{ padding: '1rem' }}>
          Dashboard Administrativo
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.value}
              selected={selectedMenu === item.value}
              onClick={() => setSelectedMenu(item.value)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main>
        {selectedMenu === 'dashboardOverview' && <DashboardOverview productos={productos} categorias={categorias} />}
        {selectedMenu === 'agregarProducto' && <AgregarProductos />}
        {selectedMenu === 'agregarCategoria' && <AgregarCategoria />}
      </Main>
    </Box>
  );
};

export default Admin;
