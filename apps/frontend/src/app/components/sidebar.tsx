import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SensorsIcon from '@mui/icons-material/Sensors';

export const SideList = (
  <React.Fragment>
    {/* Top items */}
    <ListItemButton onClick={() => { window.location.href = "/dashboard"; }}>
      <ListItemIcon sx={{ color: '#ffffff' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = "/dashboard/devices"; }}>
      <ListItemIcon sx={{ color: '#ffffff' }}>
        <SensorsIcon />
      </ListItemIcon>
      <ListItemText primary="Devices" />
    </ListItemButton>
    
  </React.Fragment>
);


   
 