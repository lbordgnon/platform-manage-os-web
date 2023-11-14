import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';
import { ClienteService } from '../../../api/ClienteService';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

export const AuthRegister = ({ title, subtitle, subtext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertIsError, setAlertIsError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorPhone, setShowErrorPhone] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showErrorConfirmPassword, setShowErrorConfirmPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [errorPhone, setErrorPhone] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  useEffect(() => {
    if (
      name !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      !showErrorName &&
      !showErrorPhone &&
      !showErrorEmail &&
      !showErrorPassword &&
      !showErrorConfirmPassword
    ) {
      setDisableButton(false);
    }
  });

  const handleClose = () => {
    setOpenAlert(false);
  };

  const signup = async () => {
    await ClienteService.signupClient(name, email, phone, password)
      .then(function (response) {
        setAlertIsError(false);
        setOpenAlert(true);
      })
      .catch(function (error) {
        setAlertIsError(true);
        setOpenAlert(true);
      });
  };

  const validateName = () => {
    if (name === '') {
      setShowErrorName(true);
      setDisableButton(true);
    } else {
      setShowErrorName(false);
    }
  };

  const validatePhone = () => {
    if (phone.length === 0) {
      setShowErrorPhone(true);
      setDisableButton(true);
      setErrorPhone('Campo de preenchimento obrigatório');
    } else if (phone.length > 0 && phone.length < 11) {
      setShowErrorPhone(true);
      setDisableButton(true);
      setErrorPhone('O Telefone está incorreto, por favor digite um telefone valído');
    } else {
      setShowErrorPhone(false);
    }
  };

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

  const validateConfirmPassword = () => {
    if (confirmPassword === '') {
      setShowErrorConfirmPassword(true);
      setDisableButton(true);
      setErrorConfirmPassword('Campo de preenchimento obrigatório');
    } else if (password !== confirmPassword) {
      setShowErrorConfirmPassword(true);
      setDisableButton(true);
      setErrorConfirmPassword('As senhas não estão iguais');
    } else {
      setShowErrorConfirmPassword(false);
    }
  };

  const HandleChangePhone = (value) => {
    let phoneNumber = value.replace(/[^\d]+/g, '');
    if (phoneNumber.length > 11) {
      phoneNumber = phoneNumber.slice(0, -1);
    }
    setPhone(phoneNumber);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <div>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Nome
          </Typography>

          <CustomTextField
            error={showErrorName}
            helperText={showErrorName ? 'Campo de preenchimento obrigatório' : ''}
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onBlur={() => validateName()}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
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
            htmlFor="phone"
            mb="5px"
            mt="25px"
          >
            Telefone
          </Typography>
          <CustomTextField
            error={showErrorPhone}
            helperText={showErrorPhone ? errorPhone : ''}
            id="phone"
            variant="outlined"
            placeholder="(00)00000-0000"
            fullWidth
            maxLength="11"
            value={phone}
            onBlur={() => validatePhone()}
            onChange={(e) => {
              HandleChangePhone(e.target.value);
            }}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
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

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="confirmPassword"
            mb="5px"
            mt="25px"
          >
            Confirmar Senha
          </Typography>
          <OutlinedInput
            id="filled-adornment-confirm-password"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            error={showConfirmPassword}
            value={confirmPassword}
            onBlur={() => validateConfirmPassword()}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={showErrorConfirmPassword} id="component-error-text">
            {showErrorConfirmPassword ? errorConfirmPassword : ''}
          </FormHelperText>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          onClick={signup}
          disabled={disableButton}
        >
          Continuar
        </Button>
        <Snackbar open={openAlert} autoHideDuration={8000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity={alertIsError ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {alertIsError
              ? 'Houve um erro com o seu cadastro, revise seus dados e tente novamente'
              : 'Cadastro realizado com sucesso'}
          </MuiAlert>
        </Snackbar>
      </Box>
      {subtitle}
    </div>
  );
};

export default AuthRegister;
