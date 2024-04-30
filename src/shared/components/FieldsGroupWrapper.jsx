import { Box, Typography } from '@mui/material';

const FieldsGroupWrapper = ({ label, children, sx, ...props }) => {
  return (
    <Box
      sx={{
        border: '1px solid #00000050',
        borderRadius: 1,
        position: 'relative',
        ...sx,
      }}
      {...props}
    >
      <Typography
        variant="caption"
        component={'h6'}
        sx={{
          position: 'absolute',
          top: '-8px',
          left: '12px',
          p: '0 4px',
          bgcolor: '#ffffff',
          color: '#00000090',
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default FieldsGroupWrapper;
