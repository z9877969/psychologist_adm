import { useCallback } from 'react';
import { List, ListItem } from '@mui/material';
import { FieldsGroupWrapper, Textarea } from 'shared/components';

const Paragraph = ({ id, content, setBlog }) => {
  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      setBlog((p) => ({
        ...p,
        items: p.items.map((el) =>
          el.id !== id ? el : { ...el, content: value }
        ),
      }));
    },
    [setBlog, id]
  );
  return (
    <FieldsGroupWrapper label={'Абзац'}>
      <List>
        <ListItem>
          <FieldsGroupWrapper label="Текст" sx={{ border: 'none' }}>
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

export default Paragraph;
