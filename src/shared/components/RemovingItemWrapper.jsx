import { Box, IconButton } from '@mui/material';
import IconMinus from '@mui/icons-material/RemoveCircleOutline';

const RemovingItemWrapper = ({ children, onClick, sx }) => {
  return (
    <Box sx={{ display: 'flex', columnGap: 1, alignItems: 'center', ...sx }}>
      {children}
      <IconButton
        color="error"
        aria-label="delete"
        onClick={onClick}
        sx={{ p: '4px' }}
      >
        <IconMinus />
      </IconButton>
    </Box>
  );
};

export default RemovingItemWrapper;
