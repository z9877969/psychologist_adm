import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Основний колір
    },
    secondary: {
      main: '#dc004e', // Додатковий колір
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Шрифт
  },
  zIndex: {
    drawer: 1200, // zIndex для сайдбару
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8,
  mixins: {
    toolbar: {
      minHeight: 64, // Висота хедера
    },
  },
});

export default theme;
