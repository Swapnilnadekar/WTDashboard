// import * as React from 'react';
// import { BrowserRouter as Router, useLocation } from 'react-router-dom';
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { SideList } from './sidebar';
// import { Outlet } from 'react-router-dom';
// import logoImg from 'apps/frontend/src/assets/lightlogo.svg';
// import Divider from '@mui/material/Divider';

// const drawerWidth: number = 200;

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: drawerWidth,
//   width: `calc(100% - ${drawerWidth}px)`,
//   height: '48px'
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       backgroundColor: '#101927', // Sidebar background color
//       color: '#ffffff', // Sidebar text color
//     },
//   }),
// );

// const defaultTheme = createTheme();

// const getPageTitle = (pathname: string) => {
//   switch (pathname) {
//     case '/dashboard':
//       return 'Dashboard';
//     case '/devicetable':
//       return 'Device Table';
//     default:
//       return 'Dashboard';
//   }
// };

// const DashboardContent = () => {
//   const location = useLocation();
//   const pageTitle = getPageTitle(location.pathname);

//   return (
//     <>
//       <ThemeProvider theme={defaultTheme}>
//         <Box sx={{ display: 'flex' }}>
//           <CssBaseline />
//           <AppBar >
//             <Toolbar
//               sx={{
//                 pr: '24px', // keep right padding when drawer closed
//               }}
//             >
//               <Typography
//                 component="h1"
//                 variant="h6"
//                 color="inherit"
//                 noWrap
//                 // sx={{ flexGrow: 1 }}
//               >
//                 {pageTitle}
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <Drawer variant="permanent" open>
//             <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
//               <img
//                 src={logoImg}
//                 alt="icon"
//                 style={{ width: 100, height: 65, marginRight: 8}} // Inverting color to white
//               />
//               <Typography sx={{ color: '#ffffff' }}>POYV Pvt Ltd</Typography>
//             </Box>
//             <Divider sx={{ width: '80%', ml: '16px', mr: '16px', borderBottomWidth: 2, backgroundColor: '#ffffff' }} /> {/* Thicker and white divider */}
//             <List component="nav">
//               {SideList}
//             </List>
//             <Divider sx={{ width: '80%', ml: '16px', mr: '16px', borderBottomWidth: 2, backgroundColor: '#ffffff' }} />
//           </Drawer>
//           <Box
//             component="main"
//             sx={{
//               backgroundColor: (theme) =>
//                 theme.palette.mode === 'light'
//                   ? theme.palette.grey[100]
//                   : theme.palette.grey[900],
//               flexGrow: 1,
//               height: '100vh',
//               overflow: 'auto',
//             }}
//           >
//             <Toolbar />
//             <Box sx={{ pt: 2, pb: 1 }}>
//               {/* <RouterBreadcrumbs/> */}
//             </Box>
//             <Outlet />
//           </Box>
//         </Box>
//       </ThemeProvider>
//     </>
//   );
// };

// export default function Dashboard() {
//   return (
//     <Router>
//       <DashboardContent />
//     </Router>
//   );
// }

import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SideList } from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import logoImg from 'apps/frontend/src/assets/poyv logo.svg';
import BasicLineChartt from '../components/chart';

const drawerWidth = 200;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: drawerWidth,
//   width: `calc(100% - ${drawerWidth}px)`,
//   height: '48px',
// }));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ open }) => ({
  zIndex: 1201, // Arbitrary high value to ensure it sits above other elements
  transition: 'width 0.3s ease, margin 0.3s ease',
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  height: '45px',
  backgroundColor: '#ffffff'
  
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      backgroundColor: '#101927', 
      color: '#ffffff',
      borderTopRightRadius: '12px',
      borderBottomRightRadius: '12px',
    },
  }),
);

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/dashboard':
      return 'DASHBOARD';
    case '/dashboard/devices':
      return 'DEVICE INFO';
    default:
      return 'DASHBOARD';
  }
};

export default function Dashboard() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
          <Typography
            component="h1"
            variant="h6"
            fontStyle={'Roboto'}
            color="#344767"
            fontWeight={'bold'}
            // noWrap
            pl={1}
            pt={1}
          >
            {pageTitle}
          </Typography>
       
      </AppBar>
      <Drawer variant="permanent" open>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', p: 1, mr: '2px', mb: '-1px', mt: '-2px'}}>
          <img
            src={logoImg}
            alt="icon"
            style={{ width: '100%', height: '90px' }}
          />
          {/* <Typography sx={{ color: '#ffffff' }}>POYV Pvt Ltd</Typography> */}
        </Box>
        <Divider sx={{ width: '80%', ml: '16px', mr: '16px', borderBottomWidth: 1, backgroundColor: '#ffffff' }} /> {/* Thicker and white divider */}
        <List component="nav" >
          {SideList}
        </List>
        <Divider sx={{ width: '80%', ml: '16px', mr: '16px', borderBottomWidth: 1, backgroundColor: '#ffffff' }} />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

