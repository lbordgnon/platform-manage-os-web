import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { EngineerService } from '../../../api/EngineerService';

export const DashboardEngineerList = ({ engineers }) => {
  const disableEngineer = async (email) => {
    await EngineerService.disableEngineer(email).then(function (response) {});
  };

  const enableEngineer = async (email) => {
    await EngineerService.enableEngineer(email).then(function (response) {});
  };

  return (
    <DashboardCard title="Lista de Engenheiros Cadastrados">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nome
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  CPF
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {engineers.map((engineer) => (
              <TableRow key={engineer.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {engineer.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {engineer.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {engineer.federalId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {engineer.userEnable === true ? 'Ativo' : 'Desativado'}
                  </Typography>
                </TableCell>
                {engineer.userEnable === true && (
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => disableEngineer(engineer.email)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Typography>
                  </TableCell>
                )}
                {engineer.userEnable === false && (
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => enableEngineer(engineer.email)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default DashboardEngineerList;
