import { useCallback, useState } from 'react';
import { Chip, List, ListItem } from '@mui/material';
import IconPlus from '@mui/icons-material/ControlPointRounded';
import {
  FieldsGroupWrapper,
  RemovingItemWrapper,
  Textarea,
} from 'shared/components';

const Paragraph = ({ id, content, accent, setBlog }) => {
  const [isAccent, setIsAccent] = useState(() => accent?.length > 0);

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setBlog((p) =>
        p.map((el) =>
          el.id !== id
            ? el
            : name === 'content'
              ? {
                  ...el,
                  content: value,
                }
              : name === 'accent'
                ? {
                    ...el,
                    accent: value.split('\n'),
                  }
                : el
        )
      );
    },
    [setBlog, id]
  );
  return (
    <FieldsGroupWrapper label={'Абзац'}>
      <List>
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
              <FieldsGroupWrapper
                label="Акцент"
                sx={{ width: '100%', border: 'none' }}
              >
                <Textarea
                  name="accent"
                  value={accent?.join('\n') || ''}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                />
              </FieldsGroupWrapper>
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
      </List>
    </FieldsGroupWrapper>
  );
};

export default Paragraph;
