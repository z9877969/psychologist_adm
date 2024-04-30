import { FormControl, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import VariantForm from './VariantForm';
import {
  Navigate,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { deleteVariant } from '@redux/products/productsOperations';
import { useDispatch } from 'react-redux';

const initialVariant = {
  color: '',
  flavor: '',
  marker: '#ffffff',
  price: 0,
  quantity: 0,
  salePrice: 0,
  volume: '',
  watermark: '',
};

const VariantsList = ({ variants }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [variant, setVariant] = useState(variants[0] ?? {});
  const [varList, setVarList] = useState(variants);
  const { pathnameBase } = useMatch('/products/:prodId/*');

  const { varId } = useParams();

  const handleChangeVariant = (_, varId) => {
    navigate(`${pathnameBase}/${varId}`);
  };

  const deleteNewVariant = useCallback(() => {
    setVarList((p) => {
      const newP = p.filter((el) => el._id !== 'new');
      if (newP.length >= 2) {
        navigate(`${pathnameBase}/${newP[newP.length - 2]._id}`);
      } else {
        navigate(pathnameBase);
      }
      return newP;
    });
  }, [navigate, pathnameBase]);

  const handleDeleteVariant = () => {
    dispatch(deleteVariant(varId)).then(() => {
      navigate(`${pathnameBase}/${varList[0]._id}`);
    });
  };

  useEffect(() => {
    setVarList(
      varId === 'new'
        ? [...variants, { ...initialVariant, _id: 'new' }]
        : variants
    );
  }, [variants, varId]);

  useEffect(() => {
    setVariant((p) => {
      const newVar = varList.find((el) => el._id === varId);
      return newVar ? newVar : p;
    });
  }, [varId, varList, navigate, pathnameBase]);

  return (
    <FormControl
      fullWidth
      sx={{
        position: 'relative',
        border: '1px solid #00000030',
        borderRadius: 1,
        p: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'rgba(0, 0, 0, 0.6)',
          transform: 'translate(14px, -9px)',
          backgroundColor: 'white',
          p: '0 8px',
        }}
      >
        Variants
      </Typography>
      <Tabs
        value={varId}
        onChange={handleChangeVariant}
        aria-label="wrapped product variants tabs"
        sx={{ mb: 2 }}
      >
        {varList.map((el) => (
          <Tab
            key={el._id}
            value={el._id}
            defaultValue={el._id}
            label={
              el._id === 'new'
                ? 'Новий варіант'
                : `${el.color ? el.color + ' ' : ''}${el.flavor ? el.flavor + ' ' : ''}${el.volume ? el.volume + ' ' : ''}` ||
                  'Без параметрів'
            }
            sx={{ p: 1 }}
            wrapped
          />
        ))}
      </Tabs>
      <Routes>
        <Route
          path=":varId"
          element={
            <VariantForm
              variant={variant}
              deleteNewVariant={deleteNewVariant}
              deleteCurVariant={handleDeleteVariant}
            />
          }
        />
        <Route path="*" element={<Navigate to={variants[0]?._id} />} />
      </Routes>
    </FormControl>
  );
};

export default VariantsList;
