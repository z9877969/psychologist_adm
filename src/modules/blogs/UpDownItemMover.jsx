import { useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import IconUp from '@mui/icons-material/ExpandLess';
import IconDown from '@mui/icons-material/ExpandMore';

const UpDownItemMover = ({ children, id, setBlog, canToTop, canToBottom }) => {
  const moveItemToTop = useCallback(() => {
    setBlog((p) => {
      const curIdx = p.findIndex((el) => el.id === id);
      const curEl = p[curIdx];
      const prevEl = p[curIdx - 1];
      return p.map((el, idx) =>
        idx === curIdx ? prevEl : idx === curIdx - 1 ? curEl : el
      );
    });
  }, [setBlog, id]);

  const moveItemToBottom = useCallback(() => {
    setBlog((p) => {
      const curIdx = p.findIndex((el) => el.id === id);
      const curEl = p[curIdx];
      const nextEl = p[curIdx + 1];
      return p.map((el, idx) =>
        idx === curIdx ? nextEl : idx === curIdx + 1 ? curEl : el
      );
    });
  }, [setBlog, id]);

  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'column'}>
        <IconButton
          color="inherit"
          disabled={!canToTop}
          onClick={moveItemToTop}
        >
          <IconUp />
        </IconButton>
        <IconButton
          color="inherit"
          disabled={!canToBottom}
          onClick={moveItemToBottom}
        >
          <IconDown />
        </IconButton>
      </Box>
      <Box width={'100%'}>{children}</Box>
    </Box>
  );
};

export default UpDownItemMover;
