import { nanoid } from 'nanoid';
import { List, ListItem, TextField } from '@mui/material';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import AddSomeoneBtn from 'shared/components/AddSomeoneBtn';

const initialItem = {
  image: '',
  descr: '',
};

const SertificatesSection = ({ block, setPage, list, title, descr }) => {
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
      label={'Секція сертифікатів'}
      sx={{
        // p: 0,
        pt: 2,
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        label="Заголовок секції"
        name="title"
        value={title}
        onChange={handleChange}
        fullWidth
      />
      <FieldsGroupWrapper label={'Опис секції'}>
        <Textarea name="descr" value={descr} sx={{ width: '100%', mb: 0 }} />
      </FieldsGroupWrapper>
      <FieldsGroupWrapper label={'Список сертифікатів'}>
        <List sx={{ width: '100%', '& > :not(style)': { mb: 2 } }}>
          {list.map(({ id, imageUrl, descr }, i) => (
            <ListItem key={id} sx={{ width: '100%', p: 0 }}>
              <FieldsGroupWrapper label={`Сертифікат-${i + 1}`}>
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
                    label="Image url"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => handleChange(e, id)}
                    fullWidth
                  />
                  <FieldsGroupWrapper label={'Опис'}>
                    <Textarea
                      name="descr"
                      value={descr}
                      onChange={(e) => handleChange(e, id)}
                      sx={{ width: '100%' }}
                    />
                  </FieldsGroupWrapper>
                </RemovingItemWrapper>
              </FieldsGroupWrapper>
            </ListItem>
          ))}
        </List>
      </FieldsGroupWrapper>
      <AddSomeoneBtn
        label="Додати сертифікат"
        onClick={() => handleAddItem()}
      />
    </FieldsGroupWrapper>
  );
};

export default SertificatesSection;
