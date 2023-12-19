import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { RequestService } from '../../api/RequestService';
import { CommentRequestService } from '../../api/CommentRequestService';
import {useNavigate, Link, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Cookie from 'js.cookie';

export const CreateCommentRequest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');
  var now = new Date();
  const [showErrorDescription, setShowErrorDescription] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [alertIsError, setAlertIsError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const history = useNavigate();
  let { idRequest } = useParams();

  useEffect(() => {
    if (!userLogin || now.toUTCString() >= expires || !idRequest) {
      history('/');
    }
  }, []);

  useEffect(() => {
    if (description !== '') {
      setDisableButton(false);
    }
  });

  const validateDescription = () => {
    if (description === '') {
      setShowErrorDescription(true);
      setDisableButton(true);
    } else {
      setShowErrorDescription(false);
    }
  };

  const CreateCommentRequest = async () => {
    await CommentRequestService.CreateCommentRequest(userLogin, description, idRequest)
      .then(function (response) {
        setAlertIsError(false);
        setOpenAlert(true);
        history(`/request-details/${idRequest}`);
      })
      .catch(function (error) {
        setAlertIsError(true);
        setOpenAlert(true);
      });
  };


  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Adicionar Comentario">
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
                    Comentario
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

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    onClick={CreateCommentRequest}
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

export default CreateCommentRequest;
