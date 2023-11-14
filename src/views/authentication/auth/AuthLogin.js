import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  Button,
  Stack,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { UserService } from '../../../api/UserService';
import MuiAlert from '@mui/material/Alert';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import Snackbar from '@mui/material/Snackbar';

export const AuthLogin = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const login = async () => {
    await UserService.login(email, password)
      .then(function (response) {
        if (response.data === false) {
            setOpenAlert(true);
        } else {
          history('/');
        }
      })
      .catch(function (error) {
        setOpenAlert(true);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <div>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Senha
          </Typography>
          <OutlinedInput
            fullWidth
            id="filled-adornment-password"
            variant="outlined"
            value={password}
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
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Esqueceu a senha?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={login}
          type="submit"
        >
          Entrar
        </Button>
      </Box>
      <Box>
        <Snackbar open={openAlert} autoHideDuration={8000} onClose={handleClose}>
          <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {'Não foi possivel realizar o login, revise seus dados e tente novamente'}
          </MuiAlert>
        </Snackbar>
      </Box>
      {subtitle}
    </div>
  );
};

export default AuthLogin;
