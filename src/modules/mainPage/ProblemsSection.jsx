import { List, ListItem, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import {
  FieldsGroupWrapper,
  MoveItemWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import AddSomeoneBtn from 'shared/components/AddSomeoneBtn';

const ProblemsSection = ({ block, setPage, title, descr, list }) => {
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

  const handleChangeItem = (e) => {
    const { name, value } = e.target;

    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        list: p[block].list.map((item) =>
          item.id !== name ? item : { ...item, text: value }
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
            ? [...p[block].list, { id: nanoid(), text: '' }]
            : p[block].list.filter((el) => el.id !== id),
      },
    }));
  };

  return (
    <FieldsGroupWrapper label={'З чим я працюю'}>
      <TextField
        label="Заголовок секції"
        name="title"
        value={title}
        onChange={handleChangeMainContent}
        fullWidth
      />
      <FieldsGroupWrapper label={'Опис секції'}>
        <Textarea
          name="descr"
          value={descr}
          sx={{ width: '100%' }}
          onChange={handleChangeMainContent}
        />
      </FieldsGroupWrapper>
      <List>
        {list.map(({ id, text }, i, arr) => (
          <ListItem key={id}>
            <MoveItemWrapper
              id={id}
              block={block}
              setPage={setPage}
              canToTop={i > 0}
              canToBottom={i < arr.length - 1}
            >
              <RemovingItemWrapper
                sx={{ width: '100%' }}
                onClick={() => actWithItem({ action: 'remove', id })}
              >
                <TextField
                  label={`Пункт-${i + 1}`}
                  name={id}
                  value={text}
                  fullWidth
                  onChange={handleChangeItem}
                />
              </RemovingItemWrapper>
            </MoveItemWrapper>
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

export default ProblemsSection;
