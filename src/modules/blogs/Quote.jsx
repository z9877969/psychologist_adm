import { useState } from 'react';
import { Chip, List, ListItem, TextField } from '@mui/material';
import IconPlus from '@mui/icons-material/ControlPointRounded';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';

const Quote = ({ content, accent, author, setBlog, id }) => {
  const [isAccent, setIsAccent] = useState(() => accent?.length > 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((p) => ({
      ...p,
      items: p.items.map((el) =>
        el.id !== id ? el : { ...el, [name]: value }
      ),
    }));
  };

  return (
    <FieldsGroupWrapper label={'Цитата'}>
      <List>
        <ListItem>
          <TextField
            label="Автор"
            size="small"
            name="author"
            value={author}
            onChange={handleChange}
            fullWidth
          />
        </ListItem>
        <ListItem>
          {isAccent ? (
            <RemovingItemWrapper
              onClick={() => {
                setIsAccent(false);
                setBlog((p) =>
                  p.map((el) => (el.id !== id ? el : { ...el, accent: [] }))
                );
              }}
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
            <Chip
              label={'Акцент'}
              variant="outlined"
              color="success"
              icon={<IconPlus />}
              onClick={() => setIsAccent(true)}
            />
          )}
        </ListItem>
        <ListItem>
          <FieldsGroupWrapper
            label="Текст"
            sx={{ width: '100%', border: 'none' }}
          >
            <Textarea
              name="content"
              value={content}
              onChange={handleChange}
              sx={{ width: '100%' }}
            />
          </FieldsGroupWrapper>
        </ListItem>
      </List>
    </FieldsGroupWrapper>
  );
};

export default Quote;

const q = {
  content: '',
  accent: '',
  author: '',
};
