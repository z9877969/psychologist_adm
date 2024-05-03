import { List, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';

const mainLinkStyles = {
  color: 'inherit',
  padding: '0.8rem 0',
  width: '100%',
  display: 'block',
};

const getIsActive = ({ isActive }) =>
  isActive
    ? {
        ...mainLinkStyles,
        borderBottom: '1px solid #00000050',
        borderTop: '1px solid #00000050',
        fontSize: '1.2rem',
        fontWeight: '700',
      }
    : mainLinkStyles;

const linkOptions = [
  {
    title: 'Головна',
    to: '/',
  },
  {
    title: 'Відгуки',
    to: '/feedbacks',
  },
  {
    title: 'Блоги',
    to: '/blogs',
  },
];

const Sidebar = () => {
  return (
    <List
      sx={{
        borderRight: '1px solid black',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {linkOptions.map(({ to, title }) => (
        <ListItem key={to} sx={{ m: 0, pb: 0, pt: 0 }}>
          <NavLink style={getIsActive} to={to}>
            {title}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
