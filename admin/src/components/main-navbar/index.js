import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <HomeIcon />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
