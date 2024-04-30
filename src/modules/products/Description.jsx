import { useCallback, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Textarea from './Textarea';
import { nanoid } from 'nanoid';
import { RemovingItemWrapper } from 'shared/components';

const prgrf = {
  paragraph: '',
};
const list = {
  title: '',
  items: [],
};

const Description = ({ description, setDescription }) => {
  const [descr, setDescr] = useState(description);

  const setDescrWrapper = useCallback(
    (descr) => {
      setDescription(descr);
      return descr;
    },
    [setDescription]
  );

  const addParagraph = () => {
    setDescr((p) => setDescrWrapper([...p, { ...prgrf, id: nanoid() }]));
  };
  const addList = () => {
    setDescr((p) => setDescrWrapper([...p, { ...list, id: nanoid() }]));
  };
  const deleteItem = (id) => {
    setDescr((p) => setDescrWrapper(p.filter((el) => el.id !== id)));
  };

  return (
    <Box
      sx={{
        border: '1px solid #00000050',
        borderRadius: 1,
        pl: 2,
        pr: 2,
        pt: 2,
        pb: 2,
        position: 'relative',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: '-9px',
          backgroundColor: '#ffffff',
          p: '0 4px',
        }}
      >
        Description
      </Typography>
      <Box
        sx={{
          '& > :not(style)': { m: 2 },
        }}
      >
        {descr.map(({ paragraph, title, items, id }) => {
          if (paragraph !== undefined) {
            return (
              <RemovingItemWrapper key={id} onClick={() => deleteItem(id)}>
                <Textarea
                  placeholder="Текст абзацу"
                  minLength={80}
                  sx={{ fontSize: '100%', width: '100%' }}
                  value={paragraph}
                  onChange={(e) =>
                    setDescr((p) =>
                      setDescrWrapper(
                        p.map((el) =>
                          el.id !== id
                            ? el
                            : { ...el, paragraph: e.target.value }
                        )
                      )
                    )
                  }
                />
              </RemovingItemWrapper>
            );
          }
          return (
            <RemovingItemWrapper key={id} onClick={() => deleteItem(id)}>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  label="Заголовок списку"
                  sx={{ mb: 1, width: '100%' }}
                  value={title}
                  onChange={(e) =>
                    setDescr((p) =>
                      setDescrWrapper(
                        p.map((el) =>
                          el.id !== id ? el : { ...el, title: e.target.value }
                        )
                      )
                    )
                  }
                />
                <Textarea
                  placeholder="Пункти списку"
                  minLength={80}
                  sx={{ fontSize: '100%', width: '100%' }}
                  value={items.join('\n')}
                  onChange={(e) => {
                    setDescr((p) =>
                      setDescrWrapper(
                        p.map((el) =>
                          el.id !== id
                            ? el
                            : { ...el, items: e.target.value.split('\n') }
                        )
                      )
                    );
                  }}
                />
              </Box>
            </RemovingItemWrapper>
          );
        })}
      </Box>
      <Box sx={{ mt: 2, display: 'flex', columnGap: 1 }}>
        <Button variant="outlined" color="success" onClick={addParagraph}>
          Add paragraph
        </Button>
        <Button variant="outlined" color="success" onClick={addList}>
          Add list
        </Button>
      </Box>
    </Box>
  );
};

export default Description;
