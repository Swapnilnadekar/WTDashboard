// import React, { useState, useEffect } from "react";
// import { Card, CardContent, Grid, TextField, Button, Box } from "@mui/material";
// import { useTheme } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { supabase } from "../auth/supabaseclient";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   ReferenceArea,
//   Legend,
// } from "recharts";

// interface IData {
//   timestamp: Date;
//   litre: number;
// }
// import { useSnackbar } from 'notistack';


// export default function BasicLineChartt() {
//   const [data, setData] = useState<IData[]>([]);
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const fetchData = async (start: string, end: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/sensor?startDate=${start}&endDate=${end}`);
//       const responseData = Array.isArray(response.data) ? response.data : [response.data];
//       setData(responseData);
//       // enqueueSnackbar('Data fetched successfully!', { variant: 'success' , autoHideDuration: 3000  });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // enqueueSnackbar('Error fetching data', { variant: 'error', autoHideDuration: 3000  });
//     }
//   };

//   useEffect(() => {
//     const defaultStartDate = getDateTenDaysBefore();
//     const defaultEndDate = getTomorrowDate();
//     fetchData(defaultStartDate, defaultEndDate);

//     const channel = supabase
//       .channel('custom-all-channel')
//       .on(
//         'postgres_changes',
//         { event: '*', schema: 'public', table: 'sensor_one' }, // Replace with your actual schema and table name
//         (payload) => {
//           console.log('Change received!', payload);
//           fetchData(defaultStartDate, defaultEndDate); // Re-fetch data on any change
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const handleButtonClick = async () => {
//     await fetchData(startDate, endDate);
//     navigate(`?startDate=${startDate}&endDate=${endDate}`);
//   };

//   const getTomorrowDate = (): string => {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return formatDate(tomorrow);
//   };

//   const getDateTenDaysBefore = (): string => {
//     const today = new Date();
//     today.setDate(today.getDate() - 7);
//     return formatDate(today);
//   };

//   const formatDate = (date: Date): string => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const getTodayDate = (): string => {
//     const today = new Date();
//     return formatDate(today);
//   };

//   const todaydate=getTodayDate();
//   const sevenDays=getDateTenDaysBefore();
//   const renderLegend = () => {
//     return (
//       <Box sx={{pt:2}}>
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
//           <div style={{ width: 20, height: 10, backgroundColor: '#FC9191', marginRight: 5 }}></div>
//           <span>Critical</span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
//           <div style={{ width: 20, height: 10, backgroundColor: '#FFD275', marginRight: 5 }}></div>
//           <span>Moderate</span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{ width: 20, height: 10, backgroundColor: '#5AAD6A', marginRight: 5 }}></div>
//           <span>Full</span>
//         </div>
//       </div>
//       </Box>
//     );
//   };

//   return (
//     <Card style={{ borderRadius: '4px', height: '520px' }}>
//       <CardContent style={{ height: '100%' }}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item>
//             <TextField
//             size="small"
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               variant="outlined"
//               label="Start Date"
//               InputLabelProps={{ shrink: true }}
//               inputProps={{
//               min: sevenDays,
//               max: todaydate
//                               }}
//             />
//           </Grid>
//           <Grid item>
//             <TextField
//               size="small"
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               variant="outlined"
//               label="End Date"
//               InputLabelProps={{ shrink: true }}
//               inputProps={{
//               min: sevenDays,
//               max: todaydate
//               }}
//             />
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleButtonClick}
//             >
//               Generate
//             </Button>
//           </Grid>
//         </Grid>
//         <ResponsiveContainer width="100%" height="95%">
//           <LineChart
//             data={data}
//             margin={{
//               top: 10,
//               right: 10,
//               left: 5,
//               bottom: 15,
//             }}
//           >
//             <XAxis
//               dataKey="timestamp"
//               tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
//               tickLine={true}
              
//               label={{
//                 value: "Dates",
//                 position: "insideBottom",
//                 offset: -5,
//                 fill: "#000", // Change the fill color to black or any other visible color
//               }}
//               tickFormatter={(timestamp) => {
//                 const formattedTimestamp = timestamp.replace('T', ' ');
//                 // Extract the first 10 characters of the timestamp string
//                 return formattedTimestamp.substring(0, 16);
//               }}
//             />
//             <YAxis
//               tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
//               tickLine={false}
//               label={{ value: "Liter", angle: -90, position: "insideLeft" }}
//               domain={[0, 55000]}
//               ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000]}
//             />
//             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//             <Tooltip
//               contentStyle={{
//                 borderRadius: 16,
//                 boxShadow: theme.shadows[3],
//                 backgroundColor: theme.palette.background.paper,
//                 borderColor: theme.palette.background.paper,
//               }}
//             />
//              <ReferenceArea y1={0} y2={15000} strokeOpacity={0.3} fill="#FC9191" />
//             <ReferenceArea y1={15000} y2={38000} strokeOpacity={0.3} fill="#FFD275" />
//             <ReferenceArea y1={38000} y2={50000} strokeOpacity={0.3} fill="#5AAD6A" />

//             <Line
//               type="monotone"
//               dataKey="litre"
//               stroke="#ff0000"
//               strokeWidth={1}
//               dot={{ r: 2 }}
//             />
//              <Legend content={renderLegend} />
            
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }



import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, TextField, Button, Box, IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { supabase } from "../auth/supabaseclient";
import { environment } from '../../environment/environment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceArea,
  Legend,
} from "recharts";

interface IData {
  timestamp: Date;
  litre: number;
}
import { useSnackbar } from 'notistack';

export default function BasicLineChartt() {
  const apiUrl= environment.apiUrl;
  const [data, setData] = useState<IData[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false); // State to force re-render
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async (start: string, end: string) => {
    try {
      const response = await axios.get(`${apiUrl}/sensor?startDate=${start}&endDate=${end}`);
      const responseData = Array.isArray(response.data) ? response.data : [response.data];
      setData(responseData);
      // enqueueSnackbar('Data fetched successfully!', { variant: 'success' , autoHideDuration: 3000  });
    } catch (error) {
      console.error('Error fetching data:', error);
      // enqueueSnackbar('Error fetching data', { variant: 'error', autoHideDuration: 3000  });
    }
  };

  useEffect(() => {
    const defaultStartDate = getyesterdayDate();
    const defaultEndDate = getTomorrowDate();
    fetchData(defaultStartDate, defaultEndDate);

    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sensor_one' }, // Replace with your actual schema and table name
        (payload) => {
          console.log('Change received!', payload);
          fetchData(defaultStartDate, defaultEndDate); // Re-fetch data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleButtonClick = async () => {
    await fetchData(startDate, endDate);
    navigate(`?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleRefreshClick = () => {
    fetchData(startDate, endDate);
    setRefresh((prev) => !prev); // Toggle the state to force re-render
  };

  const getTomorrowDate = (): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  const getDateTenDaysBefore = (): string => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return formatDate(today);
  };

  const getyesterdayDate = (): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 1);
    return formatDate(tomorrow);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayDate = (): string => {
    const today = new Date();
    return formatDate(today);
  };

  const todaydate = getTodayDate();
  const sevenDays = getDateTenDaysBefore();
  const renderLegend = () => {
    return (
      <Box sx={{ pt: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
            <div style={{ width: 20, height: 10, backgroundColor: '#FC9191', marginRight: 5 }}></div>
            <span>Critical</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
            <div style={{ width: 20, height: 10, backgroundColor: '#FFD275', marginRight: 5 }}></div>
            <span>Moderate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20, height: 10, backgroundColor: '#5AAD6A', marginRight: 5 }}></div>
            <span>Full</span>
          </div>
        </div>
      </Box>
    );
  };

  return (
    <Card style={{ borderRadius: '4px', height: '520px' }}>
      <CardContent style={{ height: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              size="small"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              variant="outlined"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: sevenDays,
                max: todaydate
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              size="small"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              variant="outlined"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: sevenDays,
                max: todaydate
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
            >
              Generate
            </Button>
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={handleRefreshClick}>
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
        <ResponsiveContainer key={refresh.toString()} width="100%" height="95%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 5,
              bottom: 15,
            }}
          >
            <XAxis
              dataKey="timestamp"
              tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
              tickLine={true}
              label={{
                value: "Date and Time",
                position: "insideBottom",
                offset: -5,
                fill: "#000", // Change the fill color to black or any other visible color
              }}
              tickFormatter={(timestamp) => {
                const formattedTimestamp = timestamp.replace('T', ' ');
                // Extract the first 10 characters of the timestamp string
                return formattedTimestamp.substring(0, 16);
              }}
            />
            <YAxis
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              tickLine={false}
              label={{ value: "Liters", angle: -90, position: "insideLeft" }}
              domain={[0, 55000]}
              ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000]}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.background.paper,
              }}
            />
            <ReferenceArea y1={0} y2={15000} strokeOpacity={0.3} fill="#FC9191" />
            <ReferenceArea y1={15000} y2={38000} strokeOpacity={0.3} fill="#FFD275" />
            <ReferenceArea y1={38000} y2={50000} strokeOpacity={0.3} fill="#5AAD6A" />

            <Line
              type="monotone"
              dataKey="litre"
              stroke="#ff0000"
              strokeWidth={1}
              dot={{ r: 2 }}
            />
            <Legend content={renderLegend} />

          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
