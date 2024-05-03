import { nanoid } from 'nanoid';
import { BLOG_ITEMS } from 'shared/constants';

const blogItems = {
  [BLOG_ITEMS.PRIMARY_TITLE]: {
    block: BLOG_ITEMS.PRIMARY_TITLE,
    content: '',
  },
  [BLOG_ITEMS.PARAGRAPH]: {
    block: BLOG_ITEMS.PARAGRAPH,
    content: '',
  },
  [BLOG_ITEMS.IMAGE]: {
    block: BLOG_ITEMS.IMAGE,
    content: '',
  },
  [BLOG_ITEMS.QUOTE]: {
    block: BLOG_ITEMS.QUOTE,
    content: '',
    accent: '',
    author: '',
  },
};

export const createBlogItem = (itemType) => {
  return { ...blogItems[itemType], id: nanoid() };
};
