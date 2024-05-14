import { Chip, List, ListItem, TextField } from '@mui/material';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import { nanoid } from 'nanoid';
import AddSomeoneBtn from 'shared/components/AddSomeoneBtn';

const initialItem = {
  image: '',
  descr: '',
  price: 0,
};

const MyHelpSection = ({ block, setPage, list, title, descr }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        [name]: value,
      },
    }));
  };

  const handleChangeItem = (e, id) => {
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
    <FieldsGroupWrapper label={'Послуги та розцінки'}>
      <TextField
        label="Заголовок секції"
        name="title"
        value={title}
        onChange={handleChange}
        fullWidth
      />
      <FieldsGroupWrapper label={'Опис секції'}>
        <Textarea
          name="descr"
          value={descr}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
      </FieldsGroupWrapper>

      <List
        sx={{ width: '100%', '& > :not(style):not(:last-child)': { mb: 2 } }}
      >
        {list.map(({ id, imageUrl, descr, price, title }, i) => (
          <ListItem key={id} sx={{ width: '100%', p: 0 }}>
            <FieldsGroupWrapper label={`Послуга-${i + 1}`}>
              <RemovingItemWrapper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 2,
                  width: '100%',
                }}
                onClick={() => handleRemoveItem(id)}
              >
                <TextField
                  label="Ціна"
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => handleChangeItem(e, id)}
                  fullWidth
                />
                <TextField
                  label="Заголовок"
                  name="title"
                  value={title}
                  onChange={(e) => handleChangeItem(e, id)}
                  fullWidth
                />

                <FieldsGroupWrapper label={'Опис'}>
                  <Textarea
                    name="descr"
                    value={descr}
                    onChange={(e) => handleChangeItem(e, id)}
                    sx={{ width: '100%' }}
                  />
                </FieldsGroupWrapper>
                <TextField
                  label="Посилання на зображення"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => handleChangeItem(e, id)}
                  fullWidth
                />
              </RemovingItemWrapper>
            </FieldsGroupWrapper>
          </ListItem>
        ))}
      </List>
      <AddSomeoneBtn label="Додати послугу" onClick={() => handleAddItem()} />
    </FieldsGroupWrapper>
  );
};

export default MyHelpSection;
