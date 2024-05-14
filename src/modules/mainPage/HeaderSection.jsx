import { TextField } from '@mui/material';
import { FieldsGroupWrapper } from 'shared/components';

const HeaderSection = ({ block, setPage, factPhone, displayingPhone }) => {
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
    <FieldsGroupWrapper label={'Секція хедер'}>
      <TextField
        label="Фактичний номер телефону"
        name="factPhone"
        value={factPhone}
        onChange={handleChange}
        fullWidth
        placeholder="+380991234567"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Відображення на сторінці"
        name="displayingPhone"
        value={displayingPhone}
        onChange={handleChange}
        fullWidth
      />
    </FieldsGroupWrapper>
  );
};

export default HeaderSection;
