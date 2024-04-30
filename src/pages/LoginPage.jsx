import { Box, Button, TextField } from '@mui/material';
import { login } from '@redux/auth/authSlice';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

const env = import.meta.env;

const LoginPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      if (
        values.email === env.VITE_EMAIL &&
        values.password === env.VITE_PASSWORD
      ) {
        dispatch(login());
      }
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '375px',
        m: '0 auto',
        mb: 4,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        // fullWidth
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        // fullWidth
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="outlined" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
