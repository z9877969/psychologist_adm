import { TextField } from '@mui/material';
import { useCallback } from 'react';

const BlogImage = ({ id, content, setBlog }) => {
  const handleChange = useCallback(
    (e) => {
      setBlog((p) =>
        p.map((el) => (el.id !== id ? el : { ...el, content: e.target.value }))
      );
    },
    [id, setBlog]
  );
  return (
    <TextField
      label="Зображення"
      size="small"
      value={content}
      onChange={handleChange}
      fullWidth
    />
  );
};

export default BlogImage;
