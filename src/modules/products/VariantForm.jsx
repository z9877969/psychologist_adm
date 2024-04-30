import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { MuiColorInput } from 'mui-color-input';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import FormButtons from '../../shared/components/FormButtons';
import {
  createVariant,
  updateVariant,
} from '@redux/products/productsOperations';

const watermarkDict = {
  sale: 'Знижка',
  wow: 'Новинка',
};

const VariantForm = ({ variant, deleteCurVariant, deleteNewVariant }) => {
  const dispatch = useDispatch();
  const { varId, prodId } = useParams();
  const [canSave, setCanSave] = useState(false);

  const valuesRef = useRef(null);

  const formik = useFormik({
    initialValues: variant ?? {},
    onSubmit: (values) => {
      const { _id, ...rest } = values;
      _id;
      varId === 'new'
        ? dispatch(createVariant({ prodId, variant: rest }))
        : dispatch(updateVariant({ varId, variant: rest }));
    },
  });

  const { values, handleChange, setValues, setFieldValue, handleSubmit } =
    formik;

  const cancelEdit = () => {
    setValues(variant);
    setCanSave(false);
  };

  const cancelSave = useCallback(() => {
    deleteNewVariant();
  }, [deleteNewVariant]);

  useEffect(() => {
    if (
      valuesRef.current &&
      !canSave &&
      JSON.stringify(values) !== valuesRef.current
    ) {
      setCanSave(true);
    }
  }, [values, canSave]);

  useEffect(() => {
    if (variant) {
      setValues(variant);
      valuesRef.current = JSON.stringify(variant);
    }
    return () => {
      valuesRef.current = null;
      setCanSave(false);
    };
  }, [variant, setValues]);

  return (
    <Box
      component={'form'}
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        pr: 2,
        pb: 4,
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="color"
        label="Вкажіть колір"
        variant="outlined"
        fullWidth
        name="color"
        value={values.color}
        onChange={handleChange}
      />
      <TextField
        id="flavor"
        label="Вкажіть смак"
        variant="outlined"
        fullWidth
        name="flavor"
        value={values.flavor ?? ''}
        onChange={handleChange}
      />
      <TextField
        id="volume"
        label="Вкажіть об'єм"
        variant="outlined"
        fullWidth
        name="volume"
        value={values.volume ?? ''}
        onChange={handleChange}
      />
      <MuiColorInput
        format="hex"
        name="marker"
        value={values.marker}
        onChange={(color) => {
          setFieldValue('marker', color);
        }}
      />
      <TextField
        id="price"
        label="Вкажіть ціну"
        variant="outlined"
        fullWidth
        name="price"
        value={Number(values.price)}
        type="number"
        onChange={handleChange}
      />
      <TextField
        id="quantity"
        label="Вкажіть к-сть"
        variant="outlined"
        fullWidth
        name="quantity"
        value={Number(values.quantity)}
        onChange={handleChange}
      />
      <TextField
        id="salePrice"
        label="Вкажіть ціну знижки"
        variant="outlined"
        fullWidth
        name="salePrice"
        value={Number(values.salePrice)}
        onChange={handleChange}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ minWidth: '50px' }}>
          Watermark
        </InputLabel>
        <Select
          labelId="watermark"
          id="watermark"
          value={values.watermark ?? ''}
          label="Watermark"
          onChange={(e) => setFieldValue('watermark', e.target.value)}
        >
          {Object.keys(watermarkDict).map((el) => (
            <MenuItem key={el} value={el}>
              {watermarkDict[el]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormButtons
        disabledSave={!canSave}
        disabledCancel={!canSave && varId !== 'new'}
        onCancel={varId === 'new' ? cancelSave : cancelEdit}
        onDelete={varId === 'new' ? null : deleteCurVariant}
      />
    </Box>
  );
};

export default VariantForm;
