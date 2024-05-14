import { useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import IconUp from '@mui/icons-material/ExpandLess';
import IconDown from '@mui/icons-material/ExpandMore';

const MoveItemWrapper = ({
  children,
  id,
  block,
  setPage,
  canToTop,
  canToBottom,
}) => {
  const moveItem = useCallback(
    (direction) => {
      setPage((p) => {
        const list = p[block].list;
        const curIdx = list.findIndex((el) => el.id === id);
        const curEl = list[curIdx];
        const prevEl = list[curIdx - 1];
        const nextEl = list[curIdx + 1];
        return {
          ...p,
          [block]: {
            ...p[block],
            list: p[block].list.map((el, idx) =>
              idx === curIdx && direction === 'top'
                ? prevEl
                : idx === curIdx && direction === 'bottom'
                  ? nextEl
                  : (direction === 'top' && idx === curIdx - 1) ||
                      (direction === 'bottom' && idx === curIdx + 1)
                    ? curEl
                    : el
            ),
          },
        };
      });
    },
    [setPage, id, block]
  );

  //   const moveItemToBottom = useCallback(() => {
  //     setBlog((p) => {
  //       const curIdx = p.findIndex((el) => el.id === id);
  //       const curEl = p[curIdx];
  //       const nextEl = p[curIdx + 1];
  //       return p.map((el, idx) =>
  //         idx === curIdx ? nextEl : idx === curIdx + 1 ? curEl : el
  //       );
  //     });
  //   }, [setBlog, id]);

  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'column'}>
        <IconButton
          color="inherit"
          disabled={!canToTop}
          onClick={() => moveItem('top')}
        >
          <IconUp />
        </IconButton>
        <IconButton
          color="inherit"
          disabled={!canToBottom}
          onClick={() => moveItem('bottom')}
        >
          <IconDown />
        </IconButton>
      </Box>
      <Box width={'100%'}>{children}</Box>
    </Box>
  );
};

export default MoveItemWrapper;
