import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { RequestService } from '../../api/RequestService';
import { CsatService } from '../../api/CsatService';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js.cookie';
import { BarChart } from '@mui/x-charts/BarChart';
import Chart from 'react-apexcharts';
import generatePDF from 'react-to-pdf';

export const Reports = () => {
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  var now = new Date();
  var expiresDate = new Date(expires);
  const targetRef = useRef();
  const [requestList, setRequestList] = useState([]);
  const [csatList, setCsatList] = useState([]);
  const [rate, setRate] = useState(0);
  const [assigned, setAssigned] = useState(0);
  const [notAssigned, setNotAssigned] = useState(0);
  const [analysis, setAnalysis] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    if (!userLogin || now.valueOf() >= expiresDate.valueOf()) {
      history('/');
    }
    getRatingByEngineer();
    getRequestListEngineer();
  }, []);

  useEffect(() => {
    if (requestList) {
      setAssigned(requestList.filter((request) => request.idEngineer == null).length);
      setNotAssigned(requestList.filter((request) => request.idEngineer != null).length);
      setAnalysis(requestList.filter((request) => request.status === 1).length);
      setInProgress(requestList.filter((request) => request.status === 2).length);
      setCompleted(requestList.filter((request) => request.status === 3).length);
      setCanceled(requestList.filter((request) => request.status === 4).length);
    }
  }, [requestList]);




  const getRequestListEngineer = async () => {
    await RequestService.getRequestListEngineer().then(function (response) {
      setRequestList(response.data);
    });
  };

  const getRatingByEngineer = async () => {
    await CsatService.getRatingByEngineer(userLogin).then(function (response) {
      setCsatList(response.data);
    });
  };

  useEffect(() => {
    let sum = csatList.reduce(function (accumulator, object) {
      return accumulator + object.rate;
    }, 0);

    sum = (sum / csatList.length) * 20;
    setRate(sum.toFixed(1));
  }, [csatList]);
  

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <div ref={targetRef}>
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
              <Chart
                options={{
                  chart: {
                    height: 350,
                    type: 'radialBar',
                  },
                  plotOptions: {
                    radialBar: {
                      hollow: {
                        size: '70%',
                      },
                    },
                  },
                  labels: ['CSAT'],
                }}
                series={[rate]}
                type="radialBar"
                height={320}
              />
            </DashboardCard>
          </div>
        </Grid>
      </Grid>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => generatePDF(targetRef, { filename: 'relatórios.pdf' })}
          type="submit"
        >
          Exportar relatórios em PDF
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Reports;
