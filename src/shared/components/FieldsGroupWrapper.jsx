import { Box, Typography } from '@mui/material';

const FieldsGroupWrapper = ({ label, children, rowGap = 2, sx, ...props }) => {
  // const onlyOneChildProp = { '& > :not(style):not(:first-of-type)': { mb: 2 } };
  // const moreThanOneChildrenProp = {
  //   '& > :not(style):not(:last-child)': { mb: 2 },
  // };
  // const currentProp = Array.isArray(children)
  //   ? moreThanOneChildrenProp
  //   : onlyOneChildProp;

  return (
    <Box
      sx={{
        border: '1px solid #00000050',
        borderRadius: 1,
        position: 'relative',
        p: 1,
        pt: 2,
        pb: '4px',
        width: '100%',
        // mb: 2,
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
      {/* <Box sx={{ ...currentProp, width: '100%', pt: 1 }}>{children}</Box> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap,
          width: '100%',
          pt: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FieldsGroupWrapper;
