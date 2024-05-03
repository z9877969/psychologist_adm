import { TextField } from '@mui/material';
import { useCallback } from 'react';

const BlogImagePreview = ({ content, setBlog }) => {
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBlog((p) => ({ ...p, [name]: value }));
    },
    [setBlog]
  );
  return (
    <TextField
      label="Зображення"
      size="small"
      value={content}
      onChange={handleChange}
      fullWidth
      name="previewUrl"
    />
  );
};

export default BlogImagePreview;
