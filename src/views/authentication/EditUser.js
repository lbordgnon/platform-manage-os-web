import React from 'react';
import { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { useNavigate, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Cookie from 'js.cookie';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserService } from '../../api/UserService';

export const CreateOsPage = () => {
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  var now = new Date();
  var expiresDate = new Date(expires);
  const [disableButton, setDisableButton] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const history = useNavigate();
  const [email, setEmail] = useState(userLogin);
  const [password, setPassword] = useState('');
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!userLogin || now.valueOf() >= expiresDate.valueOf()) {
      history('/');
    }
  }, []);

  useEffect(() => {
    if (password !== '') {
      setDisableButton(false);
    }
  });

  const validateEmail = () => {
    const emailIsValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    if (email === '') {
      setShowErrorEmail(true);
      setDisableButton(true);
      setErrorEmail('Campo de preenchimento obrigatório');
    } else if (!emailIsValid) {
      setShowErrorEmail(true);
      setDisableButton(true);
      setErrorEmail('O Email está incorreto, por favor digite um email valído');
    } else {
      setShowErrorEmail(false);
    }
  };

  const validatePassword = () => {
    if (password === '') {
      setShowErrorPassword(true);
      setDisableButton(true);
    } else {
      setShowErrorPassword(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const editUser = async () => {
    const newLogin = email === userLogin ? '' : email;
    await UserService.editUser(userLogin, newLogin, password)
      .then(function (response) {
        history('/dashboard');
      })
      .catch(function (error) {
        setOpenAlert(true);
      });
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Meu Perfil">
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
                    Email
                  </Typography>
                  <CustomTextField
                    error={showErrorEmail}
                    helperText={showErrorEmail ? errorEmail : ''}
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onBlur={() => validateEmail()}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Senha
                  </Typography>
                  <OutlinedInput
                    id="filled-adornment-password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    error={showErrorPassword}
                    value={password}
                    onBlur={() => validatePassword()}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={showErrorPassword} id="component-error-text">
                    {showErrorPassword ? 'Campo de preenchimento obrigatório' : ''}
                  </FormHelperText>

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    onClick={editUser}
                    disabled={disableButton}
                  >
                    Confirmar
                  </Button>
                  {openAlert && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert variant="filled" severity={'error'}>
                        {'Houve um erro com o sua OS, revise seus dados e tente novamente'}
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

export default CreateOsPage;
