import { nanoid } from 'nanoid';
import { BLOG_ITEMS } from 'shared/constants';

const blogItems = {
  [BLOG_ITEMS.PRIMARY_TITLE]: {
    block: 'primaryTitle',
    content: '',
  },
  [BLOG_ITEMS.ABOUT]: {
    block: 'about',
    content: ['', ''],
  },
  [BLOG_ITEMS.PARAGRAPH]: {
    block: 'paragraph',
    content: '',
    accent: [],
  },
  [BLOG_ITEMS.LIST]: {
    block: 'list',
    content: [],
  },
  [BLOG_ITEMS.IMAGE]: {
    block: 'image',
    content: '',
  },
  [BLOG_ITEMS.SECONDARY_TITLE]: {
    block: 'secondaryTitle',
    content: '',
  },
};

export const createBlogItem = (itemType) => {
  return { ...blogItems[itemType], id: nanoid() };
};
