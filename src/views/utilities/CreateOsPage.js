import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

export const CreateOsPage = () => {
  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const validateTtitle = () => {
    if (title === '') {
      setShowErrorTitle(true);
      setDisableButton(true);
    } else {
      setShowErrorTitle(false);
    }
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Criar Ordem De Serviço">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
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
                      id="name"
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
                    <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreateOsPage;
