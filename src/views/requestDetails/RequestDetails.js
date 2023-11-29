import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { RequestService } from '../../api/RequestService';
import { ClienteService } from '../../api/ClienteService';
import { EngineerService } from '../../api/EngineerService';
import { BudgetService } from '../../api/BudgetService';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Cookie from 'js.cookie';
import { statusRequest } from '../../constants/Constants';
import DashboardBudgetList from '../../views/dashboardBudget/components/DashboardBudgetList';

export const RequestDetails = () => {
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  const [requestResponse, setRequestResponse] = useState({});
  const [clientResponse, setClientResponse] = useState('');
  const [engineerResponse, setEngineerResponse] = useState('');
  const [budgetsList, setBudgetsList] = useState([]);

  const history = useNavigate();
  let { idRequest } = useParams();

  useEffect(() => {
    if (!userLogin || now.toUTCString() >= expires || !idRequest) {
      history('/');
    }
    getRequestById();
  }, []);

  const getRequestById = async () => {
    await RequestService.getRequestById(idRequest)
      .then(function (response) {
        setRequestResponse(response.data);
        getClientById(response.data.idClient);
        getEngineerById(response.data.idEngineer);
        getBudgetByRequestId(response.data.id);
      })
      .catch(function (error) {});
  };

  const getClientById = async (id) => {
    await ClienteService.getClientName(id)
      .then(function (response) {
        setClientResponse(response.data);
      })
      .catch(function (error) {});
  };

  const getEngineerById = async (id) => {
    if (id) {
      await EngineerService.getEngineerById(id)
        .then(function (response) {
          setEngineerResponse(response.data);
        })
        .catch(function (error) {});
    }
    setEngineerResponse("N/A")
  };

  const getBudgetByRequestId = async (id) => {
    await BudgetService.getBudgetByRequestId(id)
      .then(function (response) {
        setBudgetsList(response.data);
      })
      .catch(function (error) {});
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Ordem De Serviço">
            <Grid container spacing={3}>
              <Grid item sm={8}>
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Nº
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {requestResponse.identificationNumber}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Cliente
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {clientResponse}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Título
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {requestResponse.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Descrição
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {requestResponse.description}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sm={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Status
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {statusRequest[requestResponse.status]}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Engenheiro Responsável
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {engineerResponse}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardBudgetList budgets={budgetsList}  engineer={userType === 1} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default RequestDetails;
