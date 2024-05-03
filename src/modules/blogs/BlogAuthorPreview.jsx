import { List, ListItem, TextField } from '@mui/material';
import { FieldsGroupWrapper } from 'shared/components';

const BlogAuthorPreview = ({ content, setBlog }) => {
  const { author, date } = content || {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((p) => ({ ...p, author: { ...p.author, [name]: value } }));
  };
  return (
    <FieldsGroupWrapper label={'Публікація'}>
      <List sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ListItem>
          <TextField
            name="author"
            value={author}
            fullWidth
            label="Автор"
            size="small"
            onChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="date"
            value={date}
            placeholder="DD.MM.YYYY"
            fullWidth
            label="Дата"
            size="small"
            onChange={handleChange}
          />
        </ListItem>
      </List>
    </FieldsGroupWrapper>
  );
};

export default BlogAuthorPreview;
