import React from 'react';
import {Outlet} from 'react-router-dom';
import {styled} from '@material-ui/core/styles';
import DashboardSidebar from '../dashboard-sidebar';
import DashboardNavbar from '../dashboard-navbar';

const DashboardLayoutRoot = styled('div')(({theme})=> ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
}));

const DashboardLayoutWrapper = styled('div')(
    ({ theme }) => ({
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 300
      }
    })
  );
  
  const DashboardLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  });
  
  const DashboardLayoutContent = styled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  });

  const DashboardLayout = (props) => {
    const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);
  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );

  }

  export default DashboardLayout;