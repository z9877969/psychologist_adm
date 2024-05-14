import { TextField } from '@mui/material';
import { FieldsGroupWrapper, Textarea } from 'shared/components';

const HeroSection = ({ block, setPage, title, descr }) => {
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
    <FieldsGroupWrapper label={'Секція герой'}>
      <TextField
        label="Заголовок секції"
        name="title"
        value={title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FieldsGroupWrapper label={'Опис секції'}>
        <Textarea
          name="descr"
          value={descr}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
      </FieldsGroupWrapper>
    </FieldsGroupWrapper>
  );
};

export default HeroSection;
