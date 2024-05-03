import { getBlogsList } from '@redux/blogs/blogsOperations';
import { selectBlogsList } from '@redux/blogs/blogsSelectors';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const initialBlog = {
  category: null,
  author: null,
  items: [],
  previewUrl: '',
};

export const useBlog = () => {
  const dispatch = useDispatch();

  const { blogId } = useParams();
  const blogsList = useSelector(selectBlogsList);

  const [localBlog, setLocalBlog] = useState(null);

  const blog = useMemo(() => {
    const blogItem = blogsList.find((el) => el._id === blogId);
    return blogItem ? blogItem : null;
  }, [blogsList, blogId]);

  useEffect(() => {
    dispatch(getBlogsList());
  }, [dispatch, blogId]);

  useEffect(() => {
    blog && setLocalBlog(blog);
  }, [blog]);

  useEffect(() => {
    blogId == 'new' && setLocalBlog(initialBlog);
  }, [blogId]);

  return {
    blog: localBlog,
    setBlog: setLocalBlog,
    storedBlog: blog,
  };
};
