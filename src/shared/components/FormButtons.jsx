import { Box, Button } from '@mui/material';

const FormButtons = ({
  disabledSave = false,
  disabledCancel = false,
  onCancel,
  onDelete,
  sx = {},
  ref,
}) => {
  return (
    <Box
      ref={ref}
      sx={{ display: 'flex', justifyContent: 'space-around', ...sx }}
    >
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ display: 'flex', width: '150px' }}
        disabled={disabledSave}
      >
        Save
      </Button>
      {onDelete && (
        <Button
          variant="contained"
          color="error"
          type="button"
          sx={{ display: 'flex', width: '150px' }}
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
      <Button
        variant="outlined"
        color="error"
        type="button"
        sx={{ display: 'flex', width: '150px' }}
        disabled={disabledCancel}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default FormButtons;
