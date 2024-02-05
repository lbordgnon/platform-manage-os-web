import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BudgetService } from '../../api/BudgetService';
import { useState, useEffect } from 'react';
import DashboardBudgetList from './components/DashboardBudgetList';
import Cookie from 'js.cookie';
import { useNavigate } from 'react-router-dom';

export const Budgets = () => {
  const [budgetsList, setBudgetsList] = useState([]);
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  var expiresDate = new Date(expires);

  const history = useNavigate();

  useEffect(() => {
    if (!userLogin || now.valueOf() >= expiresDate.valueOf() || userType !== 1) {
      history('/');
    } else{
      getAllBudgets();
    }
  });

  const getAllBudgets = async () => {
    await BudgetService.getAllBudgets(userLogin).then(function (response) {
      setBudgetsList(response.data);
    });
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <DashboardBudgetList budgets={budgetsList} engineer={userType === 1} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Budgets;
