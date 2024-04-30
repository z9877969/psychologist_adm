import { List, ListItem } from '@mui/material';

const ProductsList = ({ prodList }) => {
  return (
    <List>
      {prodList.map((el) => (
        <ListItem key={el._id}>{el.title}</ListItem>
      ))}
    </List>
  );
};

export default ProductsList;
