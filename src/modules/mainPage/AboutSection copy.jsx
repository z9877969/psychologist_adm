import { TextField } from '@mui/material';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import AddSomeoneBtn from 'shared/components/AddSomeoneBtn';

const AboutSection = ({ block, setPage, title, accent, descr }) => {
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setPage((p) => ({
        ...p,
        [block]: {
          ...p[block],
          [name]: value,
        },
      }));
    },
    [setPage, block]
  );

  const handleAddOrRemoveAccent = (action) => {
    if (action !== 'add' && action !== 'remove') return;
    setPage((p) => {
      return {
        ...p,
        [block]: {
          ...p[block],
          accent: action === 'add' ? '' : null,
        },
      };
    });
  };

  const handleChangeItem = useCallback(
    (e, id) => {
      const { value, name } = e.target;
      setPage((p) => {
        return {
          ...p,
          [block]: {
            ...p[block],
            [name]: p[block][name].map((el) =>
              el.id !== id ? el : { ...el, value }
            ),
          },
        };
      });
    },
    [setPage, block]
  );

  const handleAddOrRemoveItem = useCallback(
    (action, id) => {
      if (action !== 'add' && action !== 'remove') return;
      setPage((p) => {
        return {
          ...p,
          [block]: {
            ...p[block],
            descr:
              action === 'add'
                ? [...p[block].descr, { id: nanoid(), value: '' }]
                : p[block].descr.filter((item) => item.id !== id),
          },
        };
      });
    },
    [setPage, block]
  );

  return (
    <FieldsGroupWrapper label={'Секція про мене'}>
      <FieldsGroupWrapper label={'Заголовок секції'}>
        <TextField
          placeholder="Заголовок секції"
          name="title"
          value={title}
          onChange={handleChange}
          fullWidth
        />
        {accent !== null && (
          <RemovingItemWrapper
            onClick={() => handleAddOrRemoveAccent('remove')}
          >
            <TextField
              label="Акцент"
              name="accent"
              value={accent}
              onChange={handleChange}
              fullWidth
            />
          </RemovingItemWrapper>
        )}
        {accent === null && (
          <AddSomeoneBtn
            label="Додати акцент"
            onClick={() => handleAddOrRemoveAccent('add')}
          />
        )}
      </FieldsGroupWrapper>
      <FieldsGroupWrapper label={'Опис секції'}>
        {descr.map(({ value, id }, i) => (
          <FieldsGroupWrapper
            key={id}
            label={`Параграф-${i + 1}`}
            sx={{ pb: 1 }}
          >
            <RemovingItemWrapper
              onClick={() => handleAddOrRemoveItem('remove', id)}
            >
              <Textarea
                name="descr"
                value={value}
                onChange={(e) => handleChangeItem(e, id)}
                sx={{ width: '100%' }}
              />
            </RemovingItemWrapper>
          </FieldsGroupWrapper>
        ))}
        <AddSomeoneBtn
          label={'Додати параграф'}
          onClick={() => handleAddOrRemoveItem('add')}
        />
      </FieldsGroupWrapper>
    </FieldsGroupWrapper>
  );
};

export default AboutSection;
