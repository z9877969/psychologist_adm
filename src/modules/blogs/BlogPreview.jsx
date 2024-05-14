import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { selectBlogCategories } from '@redux/blogs/blogsSelectors';
import { useSelector } from 'react-redux';
import { FieldsGroupWrapper } from 'shared/components';
import BlogImagePreview from './BlogImagePreview';
import BlogAuthorPreview from './BlogAuthorPreview';

const BlogPreview = ({ author, category, previewUrl, setBlog }) => {
  const categories = useSelector(selectBlogCategories);

  return (
    <FieldsGroupWrapper
      label={'Превью блога'}
      sx={{ pt: 3, '& > :not(style)': { mb: 1 }, mr: 1 }}
    >
      <FormControl fullWidth>
        <InputLabel id="category">Категорія</InputLabel>
        <Select
          labelId="blog-category"
          id="blog-category"
          value={category?._id || ''}
          label="Категорія"
          size="small"
          onChange={(e) => {
            setBlog((p) => ({
              ...p,
              category: categories.find((el) => el._id === e.target.value),
            }));
          }}
        >
          {categories.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <BlogImagePreview content={previewUrl} setBlog={setBlog} />
      <BlogAuthorPreview content={author} setBlog={setBlog} />
    </FieldsGroupWrapper>
  );
};

export default BlogPreview;
