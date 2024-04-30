import { Box, FormGroup } from '@mui/material';
import { addBlog, deleteBlog, updateBlog } from '@redux/blogs/blogsOperations';
import { useBlog } from 'hooks';
import { AddBlogTooltip, BlogItemByType, UpDownItemMover } from 'modules/blogs';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormButtons, RemovingItemWrapper } from 'shared/components';

const OneBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { blog, setBlog, storedBlog } = useBlog();
  const [canSave, setCanSave] = useState(false);

  const handleBlogItemRemove = useCallback(
    (id) => {
      setBlog((p) => p.filter((el) => el.id !== id));
    },
    [setBlog]
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      blogId !== 'new'
        ? await dispatch(updateBlog({ blog, blogId }))
        : await dispatch(addBlog(blog)).then(({ payload }) => {
            navigate(`/blogs/${payload._id}`);
          });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.message);
    } finally {
      setCanSave(false);
    }
  };

  const handleCancelSave = useCallback(() => {
    blogId === 'new' ? navigate('/blogs') : setBlog(storedBlog);
    setCanSave(false);
  }, [setBlog, storedBlog, navigate, blogId]);

  const handleDeleteProduct = () => {
    dispatch(deleteBlog(blogId)).then(() => {
      navigate('/blogs');
    });
  };

  useEffect(() => {
    if (!canSave && blogId === 'new' && blog?.length > 0) {
      setCanSave(true);
    }
    if (!canSave && blog?.length && storedBlog?.length) {
      if (JSON.stringify(blog) !== JSON.stringify(storedBlog)) {
        setCanSave(true);
      }
    }
  }, [blog, storedBlog, canSave, blogId]);

  if (!blog) return null;

  return (
    <Box sx={{ pb: 3 }} component={'form'} onSubmit={handleSubmit}>
      {blog.length > 0 && (
        <FormGroup sx={{ pr: 2, '& > :not(style)': { mb: 1 } }}>
          {blog.map(({ block, content, accent, id }, idx, arr) => (
            <RemovingItemWrapper
              onClick={() => handleBlogItemRemove(id)}
              key={id}
            >
              <Box width={'100%'} display={'flex'}>
                <UpDownItemMover
                  id={id}
                  canToBottom={idx < arr.length - 1}
                  canToTop={idx > 0}
                  setBlog={setBlog}
                >
                  <BlogItemByType
                    accent={accent}
                    block={block}
                    content={content}
                    id={id}
                    setBlog={setBlog}
                  />
                </UpDownItemMover>
              </Box>
            </RemovingItemWrapper>
          ))}
        </FormGroup>
      )}
      <AddBlogTooltip setBlog={setBlog} />
      <FormButtons
        disabledCancel={blogId !== 'new' && !canSave}
        disabledSave={!canSave}
        onCancel={handleCancelSave}
        onDelete={blogId !== 'new' && handleDeleteProduct}
      />
    </Box>
  );
};

export default OneBlogPage;
