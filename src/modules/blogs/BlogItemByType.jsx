import About from './BlogAuthorPreview';
import BlogImage from './BlogImage';
import Paragraph from './Paragraph';
import PrimaryTitle from './PrimaryTitle';
import Quote from './Quote';
import SecondaryTitle from './SecondaryTitle';
import TextList from './TextList';

const BlogItemByType = ({ block, content, accent, author, id, setBlog }) => {
  switch (block) {
    case 'primaryTitle':
      return <PrimaryTitle id={id} content={content} setBlog={setBlog} />;
    case 'about':
      return <About id={id} content={content} setBlog={setBlog} />;
    case 'paragraph':
      return (
        <Paragraph
          id={id}
          content={content}
          accent={accent}
          setBlog={setBlog}
        />
      );
    case 'list':
      return <TextList id={id} content={content} setBlog={setBlog} />;
    case 'secondaryTitle':
      return <SecondaryTitle id={id} content={content} setBlog={setBlog} />;
    case 'image':
      return <BlogImage id={id} content={content} setBlog={setBlog} />;
    case 'quote':
      return (
        <Quote
          id={id}
          content={content}
          accent={accent}
          author={author}
          setBlog={setBlog}
        />
      );
    default:
      return null;
  }
};

export default BlogItemByType;
