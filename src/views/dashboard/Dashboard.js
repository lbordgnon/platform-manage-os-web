import React from 'react';
import { Grid, Box, OutlinedInput, InputAdornment } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { RequestService } from '../../api/RequestService';
import { useState, useEffect } from 'react';
import DashboardRequestList from './components/DashboardRequestList';
import Cookie from 'js.cookie';
import { useNavigate, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

export const Dashboard = () => {
  const [requestList, setRequestList] = useState([]);
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  var expiresDate = new Date(expires);
  const history = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {

    if (!userLogin || now.valueOf() >= expiresDate.valueOf()) {
      history('/');
    } else if (userType === 2) {
      getRequestList();
    } else {
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

  const handleSearchRequest = async (value) => {
    setQuery(value);
    await RequestService.getRequestByClient(value, userLogin)
      .then(function (response) {
        setRequestList(response.data);

      })
      .catch(function (error) {});
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <OutlinedInput
              fullWidth
              id="filled-adornment-password"
              variant="outlined"
              type="text"
              value={query}
              onChange={(e) => {
                handleSearchRequest(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <DashboardRequestList requests={requestList.sort()} engineer={userType === 1} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
