import { getOneBlog } from '@redux/blogs/blogsOperations';
import { selectBlogsList } from '@redux/blogs/blogsSelectors';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useBlog = () => {
  const dispatch = useDispatch();

  const { blogId } = useParams();
  const blogsList = useSelector(selectBlogsList);
  const blog = useMemo(() => {
    const blogItem = blogsList.find((el) => el._id === blogId);
    return blogItem ? blogItem.items : null;
  }, [blogsList, blogId]);

  const [localBlog, setLocalBlog] = useState([]);

  useEffect(() => {
    blogId !== 'new' && dispatch(getOneBlog(blogId));
  }, [dispatch, blogId]);

  useEffect(() => {
    blog && setLocalBlog(blog);
  }, [blog]);

  return {
    blog: localBlog,
    setBlog: setLocalBlog,
    storedBlog: blog,
  };
};
