import { List, ListItem, TextField } from '@mui/material';
import { nanoid } from 'nanoid';
import {
  FieldsGroupWrapper,
  MoveItemWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import AddSomeoneBtn from 'shared/components/AddSomeoneBtn';

const FAQSection = ({ block, setPage, title, list }) => {
  const handleChangeMainContent = (e) => {
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
        list: p[block].list.map((item) =>
          item.id !== id ? item : { ...item, [name]: value }
        ),
      },
    }));
  };

  const actWithItem = ({ action, id }) => {
    if (action !== 'add' && action !== 'remove') return;
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        list:
          action === 'add'
            ? [...p[block].list, { id: nanoid(), text: '', title: '' }]
            : p[block].list.filter((el) => el.id !== id),
      },
    }));
  };

  return (
    <FieldsGroupWrapper label={'FAQ секція'}>
      <TextField
        label="Заголовок секції"
        name="title"
        value={title}
        onChange={handleChangeMainContent}
        fullWidth
      />
      <List>
        {list.map(({ id, title, text }, i, arr) => (
          <ListItem key={id}>
            <FieldsGroupWrapper>
              <MoveItemWrapper
                id={id}
                block={block}
                setPage={setPage}
                canToTop={i > 0}
                canToBottom={i < arr.length - 1}
              >
                <RemovingItemWrapper
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onClick={() => actWithItem({ action: 'remove', id })}
                >
                  <TextField
                    label={`Запитання-${i + 1}`}
                    name={'title'}
                    value={title}
                    fullWidth
                    onChange={(e) => handleChangeItem(e, id)}
                    sx={{ mb: 1 }}
                  />
                  <FieldsGroupWrapper label={`Відповідь-${i + 1}`}>
                    <Textarea
                      name="text"
                      value={text}
                      sx={{ width: '100%' }}
                      onChange={(e) => handleChangeItem(e, id)}
                    />
                  </FieldsGroupWrapper>
                </RemovingItemWrapper>
              </MoveItemWrapper>
            </FieldsGroupWrapper>
          </ListItem>
        ))}
      </List>
      <AddSomeoneBtn
        label={'Додати пункт списку'}
        onClick={() => actWithItem({ action: 'add' })}
        sx={{ mt: '-16px' }}
      />
    </FieldsGroupWrapper>
  );
};

export default FAQSection;
