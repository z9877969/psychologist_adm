import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormGroup,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { getBlogsList } from '@redux/blogs/blogsOperations';
import { selectBlogsList } from '@redux/blogs/blogsSelectors';

const BlogsListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogsList = useSelector(selectBlogsList);

  const handleAddBlog = () => {
    navigate('/blogs/new');
  };

  useEffect(() => {
    dispatch(getBlogsList());
  }, [dispatch]);

  return (
    <>
      <Box display={'flex'} columnGap={2}>
        <Typography variant="h4" component={'h1'}>
          Список блогів
        </Typography>
        <Button variant="outlined" color="success" onClick={handleAddBlog}>
          Створити блог
        </Button>
      </Box>
      <List sx={{ '& > :not(style)': { m: 1, pr: 2 } }}>
        {blogsList.map((el) => (
          <ListItem key={el._id} sx={{ p: '0' }}>
            <Link
              to={'/blogs/' + el._id}
              style={{ display: 'block', width: '100%' }}
            >
              <FormGroup
                sx={{
                  borderTop: '1px solid #00000050',
                  borderBottom: '1px solid #00000050',
                  p: 1,
                  width: '100%',
                }}
              >
                <Typography variant="button" color={'InfoText'} component={'p'}>
                  {el.items[0].content}
                </Typography>
              </FormGroup>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BlogsListPage;
