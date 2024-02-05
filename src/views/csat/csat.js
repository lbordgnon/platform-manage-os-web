import React from 'react';
import { useEffect } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { RequestService } from '../../api/RequestService';
import { EngineerService } from '../../api/EngineerService';
import { CsatService } from '../../api/CsatService';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Cookie from 'js.cookie';
import Rating from '@mui/material/Rating';

export const CreateOsPage = () => {
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  var now = new Date();
  var expiresDate = new Date(expires);

  const [value, setValue] = React.useState(0);
  const [identificationNumber, setIdentificationNumber] = React.useState('');
  const [engineerResponse, setEngineerResponse] = React.useState('');
  const history = useNavigate();

  let { idRequest, idEngineer } = useParams();

  useEffect(() => {
    if (!userLogin || now.valueOf() >= expiresDate.valueOf() || !idRequest || !idEngineer) {
      history('/');
    } else {
      getRequestById();
      getEngineerById();
    }
  }, []);

  const getRequestById = async () => {
    await RequestService.getRequestById(idRequest)
      .then(function (response) {
        setIdentificationNumber(response.data.identificationNumber);
      })
      .catch(function (error) {});
  };

  const getEngineerById = async () => {
    if (idEngineer) {
      await EngineerService.getEngineerById(idEngineer)
        .then(function (response) {
          setEngineerResponse(response.data);
        })
        .catch(function (error) {});
    } else {
      setEngineerResponse('N/A');
    }
  };

  const addRate = async () => {
    await CsatService.addRate(idRequest, idEngineer, value)
    .then(function (response) {
      history('/dashboard');
    })
    .catch(function (error) {
      history('/dashboard');
    });
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Avalie o Atendimento">
            <Grid item sm={8}>
              <Stack spacing={2}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="name"
                  mb="5px"
                >
                  Nº do chamado
                </Typography>
                <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                  {identificationNumber}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="name"
                  mb="5px"
                >
                  Responsável
                </Typography>
                <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                  {engineerResponse}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="name"
                  mb="5px"
                >
                  Como você avalia o seu atendimento ?
                </Typography>
                <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Typography>
              </Stack>
            </Grid>
            <Grid container spacing={6}>
              <Grid item sm={12}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => addRate()}
                  type="submit"
                >
                  Enviar Nota
                </Button>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreateOsPage;
