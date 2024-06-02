
import React from "react";
import { Box, Paper, TableContainer ,Grid,Card,CardContent} from "@mui/material";
import StickyHeadTable from "../components/devicetable";
import BasicLineChartt from "../components/chart";
import Tanks from "../tanks/tank";
const Dashboard1 = () => {

  return (
    <React.Fragment>
      <Grid container spacing={1} >

      <Grid item xs={10} md={10}>
        {/* <Paper sx={{ width: '100%', overflow: 'hidden'}}> */}
       <BasicLineChartt/>
        {/* </Paper> */}
        </Grid>

        <Grid item xs={10} md={2} >
          <Grid item xs={11}  >
              <Tanks/>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard1;
