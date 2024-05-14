import { TextField } from '@mui/material';
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

  const handleAddOrRemoveAccent = ({ action }) => {
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
            onClick={() => handleAddOrRemoveAccent({ action: 'remove' })}
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
            onClick={() => handleAddOrRemoveAccent({ action: 'add' })}
          />
        )}
      </FieldsGroupWrapper>
      <FieldsGroupWrapper label={'Опис секції'}>
        <Textarea
          name="descr"
          value={descr}
          onChange={handleChange}
          sx={{ width: '100%', mb: 0 }}
        />
      </FieldsGroupWrapper>
    </FieldsGroupWrapper>
  );
};

export default AboutSection;
