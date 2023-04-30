import React from 'react';
import { Box, Typography, Chip, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  attributeLabel: {
    fontWeight: 'bold',
  },
  chip: {
    margin: '0 4px',
  },
});

const ProductInfo = ({ product }) => {
  console.log(product);
  const { nombre, precio, descripcion } = product;
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {nombre}
      </Typography>
      <Typography variant="h6" gutterBottom style={{ color: '#F15A24' }}>
        Precio: ${precio}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 'bold' }}
      >
        Descripción:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {descripcion}
      </Typography>
      <Box mt={2}>
        <Typography
          variant="body1"
          gutterBottom
          style={{ fontWeight: 'bold' }}
        >
          Atributos:
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(product.attributes || {}).map(([key, value]) => (
            <Grid item key={key}>
              <Typography className={classes.attributeLabel}>{key}:</Typography>
              {key === 'Colores Disponibles' && Array.isArray(value) ? (
                value.map((color) => (
                  <Chip
                    key={color}
                    style={{
                      backgroundColor: color,
                      margin: '0 4px',
                      border: '1px solid #000',
                    }}
                  />
                ))
              ) : (
                <Chip
                  label={value}
                  className={classes.chip}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductInfo;
