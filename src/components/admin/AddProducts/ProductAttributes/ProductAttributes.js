import React, { useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ColorPicker from './ColorPicker';
import GenderPicker from './GenderPicker';
import WarrantyTypePicker from './WarrantyTypePicker';
import WarrantyMonthsPicker from './WarrantyMonthsPicker';

const ProductAttributes = ({ attributes, setAttributes }) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const availableAttributes = [
    'Colores Disponibles',
    'Marca',
    'Modelo',
    'Peso',
    'Tallas',
    'Género',
    'Tipo de Garantía',
    'Meses de Garantía',
    'Estado',
    'Material',
    'Resolución',
    'Conectividad',
    'Sistema Operativo',
    'Procesador',
    'Memoria RAM',
    'Almacenamiento Interno',
    'Cámara',
    'Batería',
    'Tipo de pantalla',
    'Características especiales',
    'Duración de la batería',
    'Fuente de energía',
    'Voltaje',
    'Cantidad de núcleos',
  ];

  const handleAttributeSelection = (event) => {
    setSelectedAttributes(event.target.value);
  };

  const renderAttributeInput = (attribute) => {
    if (attribute === 'Género') {
      return (
        <GenderPicker
          selectedGender={attributes[attribute] || ''}
          setSelectedGender={(gender) =>
            setAttributes({ ...attributes, [attribute]: gender })
          }
        />
      );
    } else if (attribute === 'Colores Disponibles') {
      return (
        <ColorPicker
          selectedColors={attributes[attribute] || []}
          setSelectedColors={(colors) =>
            setAttributes({ ...attributes, [attribute]: colors })
          }
        />
      );
    } else if (attribute === 'Tipo de Garantía') {
      return (
        <WarrantyTypePicker
          selectedWarrantyType={attributes[attribute] || ''}
          setSelectedWarrantyType={(warrantyType) =>
            setAttributes({ ...attributes, [attribute]: warrantyType })
          }
        />
      );
    } else if (attribute === 'Meses de Garantía') {
      return (
        <WarrantyMonthsPicker
          selectedWarrantyMonths={attributes[attribute] || ''}
          setSelectedWarrantyMonths={(warrantyMonths) =>
            setAttributes({ ...attributes, [attribute]: warrantyMonths })
          }
        />
      );
    } else {
      return (
        <TextField
          label={attribute}
          variant="outlined"
          fullWidth
          value={attributes[attribute] || ''}
          onChange={(e) =>
            setAttributes({ ...attributes, [attribute]: e.target.value })
          }
        />
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="select-attributes-label">Atributos</InputLabel>
          <Select
            labelId="select-attributes-label"
            id="select-attributes"
            multiple
            value={selectedAttributes}
            onChange={handleAttributeSelection}
          >
            {availableAttributes.map((attribute) => (
              <MenuItem key={attribute} value={attribute}>
                {attribute}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {selectedAttributes.map((attribute) => (
        <Grid item xs={12} key={attribute}>
        {renderAttributeInput(attribute)}
      </Grid>
    ))}
  </Grid>
);
};

export default ProductAttributes;
