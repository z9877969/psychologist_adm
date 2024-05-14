import { TextField } from '@mui/material';
import { FieldsGroupWrapper, Textarea } from 'shared/components';

const ReserveSection = ({ block, setPage, title, descr }) => {
  const handleChangeMainContent = (e) => {
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
    <FieldsGroupWrapper label={'Секція бронювання'}>
      <TextField
        label="Заголовок секції"
        name="title"
        value={title}
        onChange={handleChangeMainContent}
        fullWidth
      />
      <FieldsGroupWrapper label={'Опис секції'}>
        <Textarea
          name="descr"
          value={descr}
          sx={{ width: '100%' }}
          onChange={handleChangeMainContent}
        />
      </FieldsGroupWrapper>
    </FieldsGroupWrapper>
  );
};

export default ReserveSection;
