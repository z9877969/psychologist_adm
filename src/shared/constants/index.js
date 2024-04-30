// routes
export const ROUTES = {
  HOME: '/',
  MAIN: '/main',
  ABOUT: '/about',
  BLOG: '/blog/:blogId',
  NOT_FOUND: '/not-found',
  PRODUCT_CARD: '/products/:productId',
  PRODUCTS: '/products',
  GET_BLOG_ID: (blogId) => `/blog/${blogId}`,
};

export const PRODUCT_TYPES = {
  CHILD: 'child',
  ADULT: 'adult',
  ANIMAL: 'animal',
  HELPER: 'helper',
};

export const WATERMARK_TYPES = {
  SALE: 'sale',
  WOW: 'wow',
};

export const BLOG_ITEMS = {
  PRIMARY_TITLE: 'primaryTitle',
  SECONDARY_TITLE: 'secondaryTitle',
  ABOUT: 'about',
  PARAGRAPH: 'paragraph',
  LIST: 'list',
  IMAGE: 'image',
};
