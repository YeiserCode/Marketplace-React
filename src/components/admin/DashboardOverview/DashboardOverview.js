import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const DashboardOverview = ({ productos, categorias }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Productos
            </Typography>
            <Typography variant="h3" component="div">
              {productos.length}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Categorías
            </Typography>
            <Typography variant="h3" component="div">
              {categorias.length}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default DashboardOverview;
