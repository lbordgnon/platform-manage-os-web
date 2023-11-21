import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { RequestService } from '../../api/RequestService';
import { useState, useEffect } from 'react';
import DashboardRequestList from './components/DashboardRequestList';
import Cookie from 'js.cookie';
import { useNavigate, Link } from 'react-router-dom';

export const Dashboard = () => {
  const [requestList, setRequestList] = useState([]);
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  const history = useNavigate();

  useEffect(() => {
    if (!userLogin || now.toUTCString() >= expires) {
      history('/');
    } else if(userType === 2) {
      getRequestList();
    }
    else{
      getRequestListEngineer();
    }
  }, []);

  const getRequestListEngineer = async () => {
    await RequestService.getRequestListEngineer().then(function (response) {
      setRequestList(response.data);
    });
  };

  const getRequestList = async () => {
    await RequestService.getRequestList(userLogin).then(function (response) {
      setRequestList(response.data);
    });
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <DashboardRequestList requests={requestList} engineer={userType === 1} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
