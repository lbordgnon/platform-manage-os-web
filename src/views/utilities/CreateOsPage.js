import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { RequestService } from '../../api/RequestService';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const CreateOsPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const email = 'lbordgnon@hotmail.com';
  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorDescription, setShowErrorDescription] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

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

  const createOS = async () => {
    await RequestService.createOS(title, description, email)
      .then(function (response) {})
      .catch(function (error) {});
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Criar Ordem De Serviço">
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

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    onClick={createOS}
                  >
                    Cadastrar
                  </Button>
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
