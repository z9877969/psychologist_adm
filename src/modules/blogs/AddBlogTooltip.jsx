import { Box, Chip } from '@mui/material';
import { createBlogItem } from 'helpers';
import { useCallback } from 'react';
import { BLOG_ITEMS } from 'shared/constants';
import IconPlus from '@mui/icons-material/ControlPointRounded';

const options = [
  { title: 'Заголовок-1', itemType: BLOG_ITEMS.PRIMARY_TITLE },
  { title: 'Абзац', itemType: BLOG_ITEMS.PARAGRAPH },
  { title: 'Зображення', itemType: BLOG_ITEMS.IMAGE },
  { title: 'Цитата', itemType: BLOG_ITEMS.QUOTE },
  // { title: 'Заголовок-2', itemType: BLOG_ITEMS.SECONDARY_TITLE },
  // { title: 'Список', itemType: BLOG_ITEMS.LIST },
  // { title: 'Автор', itemType: BLOG_ITEMS.ABOUT },
];

const AddBlogTooltip = ({ setBlog }) => {
  const addBlogItem = useCallback(
    (itemType) => {
      setBlog((p) => ({ ...p, items: [...p.items, createBlogItem(itemType)] }));
    },
    [setBlog]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 1,
        mt: 2,
        mb: 3,
      }}
    >
      {options.map(({ title, itemType }) => (
        <Chip
          key={itemType}
          label={title}
          variant="outlined"
          color="success"
          icon={<IconPlus />}
          onClick={() => addBlogItem(itemType)}
        />
      ))}
    </Box>
  );
};

export default AddBlogTooltip;
