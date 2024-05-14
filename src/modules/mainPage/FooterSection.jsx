import { TextField } from '@mui/material';
import { FieldsGroupWrapper } from 'shared/components';

/* 

*/

const FooterSection = ({
  block,
  setPage,
  phone,
  displayingPhone,
  telegramLink,
  facebookLink,
  instagramLink,
  youtubeLink,
}) => {
  return (
    <FieldsGroupWrapper label={'Футер'}>
      <TextField
        name="phone"
        value={phone}
        label="Номер телефону (фактичний)"
        fullWidth
      />
      <TextField
        name="displayingPhone"
        value={displayingPhone}
        label="Номер телефону (на сторінці)"
        fullWidth
      />
      <TextField
        name="telegramLink"
        value={telegramLink}
        label="Telegram"
        fullWidth
      />
      <TextField
        name="facebookLink"
        value={facebookLink}
        label="Facebook"
        fullWidth
      />
      <TextField
        name="instagramLink"
        value={instagramLink}
        label="Instagram"
        fullWidth
      />
      <TextField
        name="youtubeLink"
        value={youtubeLink}
        label="Youtube"
        fullWidth
      />
    </FieldsGroupWrapper>
  );
};

export default FooterSection;
