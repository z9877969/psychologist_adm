import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import { loginUser } from '@redux/auth/authOperations';

const LoginPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(loginUser({ email: email.trim(), password: password.trim() }));
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
