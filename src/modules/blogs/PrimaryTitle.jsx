import { useCallback } from 'react';
import { TextField, Box } from '@mui/material';

const PrimaryTitle = ({ id, content, setBlog }) => {
  const handleChange = useCallback(
    (e) => {
      setBlog((p) => ({
        ...p,
        items: p.items.map((el) =>
          el.id !== id ? el : { ...el, content: e.target.value }
        ),
      }));
    },
    [id, setBlog]
  );
  return (
    <Box display={'flex'} columnGap={1}>
      <TextField
        label="Заголовок 1го рівня"
        size="small"
        value={content}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default PrimaryTitle;
