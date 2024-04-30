import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, List, ListItem } from '@mui/material';
import { getProducts } from '@redux/products/productsOperations';
import { selectProdList } from '@redux/products/productsSelectors';
import { Link, useNavigate } from 'react-router-dom';

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prodList = useSelector(selectProdList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Box sx={{ pb: 2 }}>
      <List>
        {prodList.map((el) => (
          <ListItem key={el._id}>
            <Link to={'/products/' + el._id} style={{ color: 'inherit' }}>
              {el.title}
            </Link>
          </ListItem>
        ))}
      </List>
      <Button
        sx={{ mt: 2 }}
        color="primary"
        variant="outlined"
        onClick={() => navigate('/products/new')}
      >
        Add new product
      </Button>
    </Box>
  );
};

export default ProductsListPage;
