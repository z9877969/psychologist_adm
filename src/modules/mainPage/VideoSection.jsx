import { TextField } from '@mui/material';
import { FieldsGroupWrapper } from 'shared/components';

const VideoSection = ({ title, videoUrl, setPage, block }) => {
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
    <FieldsGroupWrapper label={'Секція відео'}>
      <TextField
        label="Заголовок"
        name="title"
        value={title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
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
