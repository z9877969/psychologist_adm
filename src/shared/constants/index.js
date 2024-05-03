// routes
export const ROUTES = {
  HOME: '/',
  MAIN: '/main',
  ABOUT: '/about',
  BLOG: '/blog/:blogId',
  NOT_FOUND: '/not-found',
  GET_BLOG_ID: (blogId) => `/blog/${blogId}`,
};

export const BLOG_ITEMS = {
  PRIMARY_TITLE: 'primaryTitle',
  SECONDARY_TITLE: 'secondaryTitle',
  ABOUT: 'about',
  PARAGRAPH: 'paragraph',
  LIST: 'list',
  IMAGE: 'image',
  QUOTE: 'quote',
};
