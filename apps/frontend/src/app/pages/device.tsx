import { Outlet } from 'react-router-dom';
import StickyHeadTable from '../components/devicetable';
import { Box, Paper, TableContainer } from '@mui/material';
export default function Devices() {
  return (
    <>
      {/* <h3>DEVICES</h3> */}
      
    <Paper sx={{ width: '100%'}}>
      <TableContainer sx={{ height: 'auto'}}>
      <StickyHeadTable/>
      </TableContainer>
      </Paper>
      <Outlet />
    </>
  )
}