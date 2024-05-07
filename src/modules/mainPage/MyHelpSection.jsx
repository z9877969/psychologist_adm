import { Chip, List, ListItem, TextField } from '@mui/material';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import { nanoid } from 'nanoid';

const initialItem = {
  image: '',
  descr: '',
  price: 0,
};

const MyHelpSection = ({ list, block, setPage }) => {
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        list: p[block].list.map((el) =>
          el.id !== id
            ? el
            : {
                ...el,
                [name]: value,
              }
        ),
      },
    }));
  };

  const handleRemoveItem = (id) => {
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        list: p[block].list.filter((el) => el.id !== id),
      },
    }));
  };

  const handleAddItem = () => {
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        list: [...p[block].list, { ...initialItem, id: nanoid() }],
      },
    }));
  };
  return (
    <FieldsGroupWrapper
      label={'Секція з розцінками'}
      sx={{
        p: 0,
        pt: 2,
        pb: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <List sx={{ p: 1, width: '100%', '& > :not(style)': { mb: 2 } }}>
        {list.map(({ id, imageUrl, descr, price, title }) => (
          <ListItem key={id} sx={{ width: '100%' }}>
            <RemovingItemWrapper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 1,
                border: '1px solid #00000050',
                borderRadius: 1,
                pt: 1,
                pl: 1,
                pr: 1,
                width: '100%',
              }}
              onClick={() => handleRemoveItem(id)}
            >
              <TextField
                label="Ціна"
                type="number"
                name="price"
                value={price}
                onChange={(e) => handleChange(e, id)}
                fullWidth
              />
              <TextField
                label="Заголовок"
                name="title"
                value={title}
                onChange={(e) => handleChange(e, id)}
                fullWidth
              />

              <FieldsGroupWrapper label={'Опис'} sx={{ p: 1, width: '100%' }}>
                <Textarea
                  name="descr"
                  value={descr}
                  onChange={(e) => handleChange(e, id)}
                  sx={{ width: '100%' }}
                />
              </FieldsGroupWrapper>
              <TextField
                label="Посилання на зображення"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => handleChange(e, id)}
                fullWidth
              />
            </RemovingItemWrapper>
          </ListItem>
        ))}
      </List>
      <Chip
        label="Додати картку"
        color="success"
        variant="outlined"
        size="medium"
        icon={<PlusIcon />}
        onClick={() => handleAddItem()}
      />
    </FieldsGroupWrapper>
  );
};

export default MyHelpSection;
