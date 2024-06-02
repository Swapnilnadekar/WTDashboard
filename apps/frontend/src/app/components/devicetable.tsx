import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { supabase } from '../auth/supabaseclient';
import { Select, MenuItem, SelectChangeEvent, Chip } from '@mui/material';
import { environment } from '../../environment/environment';
interface Column {
  id: 'sensor_name' | 'timestamp' | 'litre' | 'waterpercent' | 'level';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: readonly Column[] = [
  { id: 'sensor_name', label: "Device", minWidth: 170 },
  { id: 'timestamp', label: 'Date/Time', minWidth: 170 },
  { id: 'litre', label: "Capacity (L)", minWidth: 170 },
  { id: 'waterpercent', label: "Water level (%)", minWidth: 170 },
  { id: 'level', label: "Status", minWidth: 170 }
];

interface IData {
  sensor_name: string;
  distance_cm: number;
  timestamp: string;
  litre: number;
  waterpercent: number;
  level: string;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<IData[]>([]);
  const [filter, setFilter] = React.useState<string>('');
const apiUrl = environment.apiUrl;
  const fetchData = async () => {
    try {
      const response = await axios.get<IData[]>(`${apiUrl}/sensor/all`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData(); // Fetch initial data

    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sensor_one' }, // Replace with your actual schema and table name
        (payload) => {
          console.log('Change received!', payload);
          fetchData(); // Re-fetch data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  const getChipColor = (level: string) => {
    switch (level) {
      case 'critical':
        return '#FCE4E7';
      case 'moderate':
        return '#F9ECD2';
      case 'full':
        return '#DFFAE2';
      default:
        return 'default';
    }
  };

  const getChipBorderColor = (level: string) => {
    switch (level) {
      case 'critical':
        return '#B12A28';
      case 'moderate':
        return '#E6A11C';
      case 'full':
        return '#4BAE57';
      default:
        return 'default';
    }
  };

  const getFontColor = (level: string) => {
    switch (level) {
      case 'critical':
        return '#B12A28';
      case 'moderate':
        return '#E6A11C';
      case 'full':
        return '#4BAE57';
      default:
        return 'default';
    }
  };

  const filteredData = filter ? data.filter((row) => row.level === filter) : data;

  return (
    <>
      <Select
        size="small"
        value={filter}
        onChange={handleFilterChange}
        displayEmpty
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">
          <em>Tank Status</em>
        </MenuItem>
        <MenuItem value="moderate">Moderate</MenuItem>
        <MenuItem value="full">Full</MenuItem>
        <MenuItem value="critical">Critical</MenuItem>
      </Select>
      <TableContainer sx={{ height: 'auto', pt: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  sx={{ py: 0.5 }} // reduce padding in table header cells
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.sensor_name + row.timestamp}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ py: 0.5 }}>
                          {column.id === 'level' ? (
                            <Chip
                              label={String(value)}
                              sx={{
                                backgroundColor: getChipColor(String(value)),
                                borderColor: getChipBorderColor(String(value)),
                                color: getFontColor(String(value)),
                                border: 0.7,
                                fontWeight: 'bold',
                              }}
                            />
                          ) : column.id === 'timestamp' && typeof value === 'string' ? (
                            value.replace('T', ' ').split('.')[0]
                          ) : (
                            typeof value === 'string' || typeof value === 'number' ? value : ''
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
