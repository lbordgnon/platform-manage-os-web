import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { RequestService } from '../../api/RequestService';
import { useState, useEffect } from 'react';
// components
import DashboardRequestList from './components/DashboardRequestList';

export const Dashboard = () => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    getRequestList();
  },[]);

  const getRequestList = async () => {
    await RequestService.getRequestList('lbordgnon@hotmail.com')
      .then(function (response) {
        setRequestList(response.data);
      })
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <DashboardRequestList requests={requestList} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
