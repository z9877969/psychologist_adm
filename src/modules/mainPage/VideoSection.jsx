import { TextField } from '@mui/material';
import { FieldsGroupWrapper } from 'shared/components';

const VideoSection = ({ videoUrl, setPage, block }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPage((p) => ({
      ...p,
      [block]: {
        ...p[block],
        [name]: value,
      },
    }));
  };
  return (
    <FieldsGroupWrapper
      label={'Секція відео'}
      sx={{ p: 1, pt: 2, width: '100%' }}
    >
      <TextField
        label="YouTube url"
        name="videoUrl"
        value={videoUrl}
        onChange={handleChange}
        fullWidth
      />
    </FieldsGroupWrapper>
  );
};

export default VideoSection;
