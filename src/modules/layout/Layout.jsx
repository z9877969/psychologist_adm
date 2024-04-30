import { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { selectIsAuth } from '@redux/auth/authSelectors';
import { logout } from '@redux/auth/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [pageHeight, setPageHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setPageHeight(window.innerHeight - headerRef.current.clientHeight);
  }, []);

  return (
    <>
      <AppBar position="static" ref={headerRef} sx={{ mb: '1em' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BrushBuddy Admin
          </Typography>
          {isAuth && (
            <Button
              onClick={() => dispatch(logout())}
              variant="outlined"
              sx={{
                color: '#ffffff',
                border: '1px solid #ffffff',
              }}
            >
              Logogut
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {isAuth ? (
        <Grid container spacing={2} sx={{ height: `${pageHeight}px`, pt: 0 }}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
