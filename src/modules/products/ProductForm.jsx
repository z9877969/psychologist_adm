import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import FormButtons from '../../shared/components/FormButtons';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { selectFilters } from '@redux/products/productsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '@redux/products/productsOperations';
import { useNavigate, useParams } from 'react-router-dom';
import ImagesList from './ImagesList';
import Description from './Description';

const userTypeDict = {
  child: 'Для дітей',
  adult: 'Для дорослих',
  animal: 'Для тварин',
};
const ageDict = {
  '0to3': 'До 3х років',
  '4to6': 'Від 4х до 6ти років',
  '6to12': 'Від 6ти до 12ти років',
};

const ProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prodId } = useParams();
  const filters = useSelector(selectFilters);

  const [canSave, setCanSave] = useState(false);

  const formik = useFormik({
    initialValues: product,
    onSubmit: ({ _id, ...values }) => {
      prodId === 'new'
        ? dispatch(addProduct(values)).then(({ payload }) => {
            navigate(`/products/${payload._id}`);
          })
        : dispatch(updateProduct({ id: _id, product: values })).then(() => {
            setCanSave(false);
          });
    },
  });

  const { values, setValues, handleChange, handleSubmit, setFieldValue } =
    formik;

  const cancelSave = useCallback(() => {
    prodId === 'new' ? navigate('/products') : setValues(product);
    setCanSave(false);
  }, [setValues, product, navigate, prodId]);

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product._id)).then(() => {
      navigate('/products');
    });
  };

  const setDescr = useCallback(
    (descr) => {
      setFieldValue('description', descr);
    },
    [setFieldValue]
  );

  useEffect(() => {
    product && setValues(product);
  }, [product, setValues]);

  useEffect(() => {
    if (!canSave && product && values) {
      // eslint-disable-next-line
      const { variants: pVars, ...onlyProduct } = product;
      // eslint-disable-next-line
      const { variants: vVars, ...onlyValues } = values;
      if (JSON.stringify(onlyProduct) !== JSON.stringify(onlyValues)) {
        setCanSave(true);
      }
    }
  }, [product, values, canSave]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        mb: 4,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={values.title}
        onChange={handleChange}
      />
      <TextField
        id="subtitle"
        label="Subtitle"
        variant="outlined"
        fullWidth
        name="subtitle"
        value={values.subtitle}
        onChange={handleChange}
      />
      <TextField
        id="recomendation"
        label="Recomendation"
        variant="outlined"
        fullWidth
        name="recomendation"
        value={values.recomendation}
        onChange={handleChange}
      />
      <Box>
        <InputLabel id="category">Тип користувача</InputLabel>
        <FormGroup>
          {Object.keys(userTypeDict).map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  name="userType"
                  value={type}
                  onChange={handleChange}
                  checked={values.userType.includes(type)}
                />
              }
              label={userTypeDict[type]}
            />
          ))}
        </FormGroup>
      </Box>
      <Box>
        <FormGroup>
          <InputLabel id="category">Вікові обмеження</InputLabel>
          {Object.keys(ageDict).map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  name="age"
                  value={type}
                  onChange={handleChange}
                  checked={values.age.includes(type)}
                />
              }
              label={ageDict[type]}
            />
          ))}
        </FormGroup>
      </Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Maker</InputLabel>
        <Select
          labelId="maker"
          id="maker"
          value={values.maker}
          label="Maker"
          onChange={(e) => setFieldValue('maker', e.target.value)}
        >
          {filters.makers.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={values.category}
          label="Category"
          onChange={(e) => setFieldValue('category', e.target.value)}
        >
          {filters.categories.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ImagesList
        images={values.images}
        setImages={(images) => setFieldValue('images', images)}
      />
      <Description description={values.description} setDescription={setDescr} />

      <FormButtons
        disabledSave={!canSave}
        disabledCancel={prodId !== 'new' && !canSave}
        onCancel={cancelSave}
        onDelete={handleDeleteProduct}
      />
    </Box>
  );
};

export default ProductForm;
