import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { RequestService } from '../../api/RequestService';
import { BudgetService } from '../../api/BudgetService';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Cookie from 'js.cookie';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const CreateBudget = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetValue, setBudgetValue] = useState();
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorDescription, setShowErrorDescription] = useState(false);
  const [showErrorBudgetValue, setShowErrorBudgetValue] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [alertIsError, setAlertIsError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState();
  const history = useNavigate();
  let { idRequest } = useParams();

  useEffect(() => {
    if (!userLogin || now.toUTCString() >= expires) {
      history('/');
    }
    getRequestByEngineer();
    setDisableButton(false);
  }, []);

  useEffect(() => {
    if (title !== '' && description !== '' && budgetValue !== '' && request) {
      setDisableButton(false);
    }
  });

  const validateTtitle = () => {
    if (title === '') {
      setShowErrorTitle(true);
      setDisableButton(true);
    } else {
      setShowErrorTitle(false);
    }
  };

  const validateDescription = () => {
    if (description === '') {
      setShowErrorDescription(true);
      setDisableButton(true);
    } else {
      setShowErrorDescription(false);
    }
  };

  const validateBudgetValue = () => {
    if (budgetValue === '') {
      setShowErrorBudgetValue(true);
      setDisableButton(true);
    } else {
      setShowErrorBudgetValue(false);
    }
  };

  const createBudget = async () => {
    await BudgetService.createBudget(title, description, budgetValue,userLogin,request.id)
      .then(function (response) {
        setAlertIsError(false);
        setOpenAlert(true);
        history('/dashboard');
      })
      .catch(function (error) {
        setAlertIsError(true);
        setOpenAlert(true);
      });
  };

  const getRequestByEngineer = async () => {
    await RequestService.getRequestByEngineer(userLogin)
      .then(function (response) {
        setRequests(response.data);
      })
      .catch(function (error) {});
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleChangeBudgetValue = (value) => {
    if (value == '') {
      return setBudgetValue(0);
    }
    var numsStr = value.replace(/[^0-9]/g, '');
    return setBudgetValue(parseInt(numsStr));
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Cadastrar Orçamento">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Ordem De Serviço
                  </Typography>
                  <Autocomplete
                    id="grouped-demo"
                    value={request}
                    onChange={(event, newValue) => {
                      setRequest(newValue);
                    }}
                    options={requests.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 1050 }}
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Título
                  </Typography>
                  <CustomTextField
                    error={showErrorTitle}
                    helperText={showErrorTitle ? 'Campo de preenchimento obrigatório' : ''}
                    id="title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onBlur={() => validateTtitle()}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Descrição
                  </Typography>
                  <CustomTextField
                    error={showErrorDescription}
                    helperText={showErrorDescription ? 'Campo de preenchimento obrigatório' : ''}
                    variant="outlined"
                    fullWidth
                    value={description}
                    onBlur={() => validateDescription()}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    multiline
                    rows={5}
                    maxRows={4}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    valor
                  </Typography>
                  <OutlinedInput
                    type="number"
                    error={showErrorBudgetValue}
                    helperText={showErrorBudgetValue ? 'Campo de preenchimento obrigatório' : ''}
                    fullWidth
                    value={budgetValue}
                    onBlur={() => validateBudgetValue()}
                    onChange={(e) => {
                      handleChangeBudgetValue(e.target.value);
                    }}
                    multiline
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    onClick={createBudget}
                    disabled={disableButton}
                  >
                    Cadastrar
                  </Button>
                  {openAlert && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert variant="filled" severity={alertIsError ? 'error' : 'success'}>
                        {' '}
                        {alertIsError
                          ? 'Houve um erro com o sua OS, revise seus dados e tente novamente'
                          : 'Ordem de serviço regristada com sucesso'}
                      </Alert>
                    </Stack>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreateBudget;
