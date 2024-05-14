import { Chip } from '@mui/material';
import PlusIcon from '@mui/icons-material/AddCircleOutline';

const AddSomeoneBtn = ({
  label,
  onClick,
  color = 'success',
  sx = {},
  ...props
}) => {
  return (
    <Chip
      label={label}
      color={color}
      variant="outlined"
      size="medium"
      icon={<PlusIcon />}
      onClick={onClick}
      sx={{
        alignSelf: 'baseline',
        ...sx,
      }}
      {...props}
    />
  );
};

export default AddSomeoneBtn;
