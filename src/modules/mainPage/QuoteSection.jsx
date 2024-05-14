import { List, ListItem, TextField } from '@mui/material';
import { useState } from 'react';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';
import AddSomeoneBtn from 'shared/components/AddSomeoneBtn';

const QuoteSection = ({ setPage, block, text, accent, author }) => {
  const [isAccent, setIsAccent] = useState(() => accent?.length > 0);

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

  const handleRemoveAccent = () => {
    setIsAccent(false);
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        accent: '',
      },
    }));
  };

  return (
    <FieldsGroupWrapper label={'Цитата'}>
      <TextField
        label="Автор"
        size="small"
        name="author"
        value={author}
        onChange={handleChange}
        fullWidth
      />
      {isAccent ? (
        <RemovingItemWrapper
          onClick={handleRemoveAccent}
          sx={{ width: '100%' }}
        >
          <TextField
            label="Акцент"
            size="small"
            name="accent"
            value={accent}
            onChange={handleChange}
            fullWidth
          />
        </RemovingItemWrapper>
      ) : (
        <AddSomeoneBtn label={'Акцент'} onClick={() => setIsAccent(true)} />
      )}
      <FieldsGroupWrapper label="Текст">
        <Textarea
          name="text"
          value={text}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
      </FieldsGroupWrapper>
    </FieldsGroupWrapper>
  );
};

export default QuoteSection;
