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
import DashboardBudgetList from '../dashboardBudget/components/DashboardBudgetList';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

export const Reports = () => {
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  const [requestList, setRequestList] = useState([]);
  const [assigned, setAssigned] = useState(0);
  const [notAssigned, setNotAssigned] = useState(0);
  const [analysis, setAnalysis] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [canceled, setCanceled] = useState(0);

  const history = useNavigate();
  let { idRequest } = useParams();

  useEffect(() => {
    if (!userLogin || now.toUTCString() >= expires) {
      history('/');
    }
    getRequestListEngineer();
  });

  const getRequestListEngineer = async () => {
    await RequestService.getRequestListEngineer().then(function (response) {
      setRequestList(response.data);
      if (requestList) {
        setAssigned(requestList.filter((request) => request.idEngineer == null).length);
        setNotAssigned(requestList.filter((request) => request.idEngineer != null).length);
        setAnalysis(requestList.filter((request) => request.status === 1).length);
        setInProgress(requestList.filter((request) => request.status === 2).length);
        setCompleted(requestList.filter((request) => request.status === 3).length);
        setCanceled(requestList.filter((request) => request.status === 4).length);
      }
    });
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Relatórios">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Relatório de chamados com Responsável Atribuído
            </Typography>
            <BarChart
              xAxis={[
                { scaleType: 'band', data: ['Total de chamados', 'Atribuídos', 'N/Atribuídos'] },
              ]}
              series={[{ data: [requestList.length, notAssigned, assigned] }]}
              width={500}
              height={300}
            />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Relatório de status dos chamados
            </Typography>
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: [
                    'Total de chamados',
                    'Em Análise',
                    'Iniciados',
                    'Concluídos',
                    'Cancelados',
                  ],
                },
              ]}
              series={[{ data: [requestList.length, analysis, inProgress, completed, canceled] }]}
              width={800}
              height={300}
            />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Reports;
