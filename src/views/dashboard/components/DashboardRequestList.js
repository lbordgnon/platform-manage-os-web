import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
import { statusRequest } from '../../../constants/Constants';
import { RequestService } from '../../../api/RequestService';
import Cookie from 'js.cookie';

export const DashboardRequestList = ({ requests, engineer }) => {
  const history = useNavigate();
  const userLogin = Cookie.get('email');

  const editRequest = async (id) => {
    history(`/create-os/${id}`);
  };

  const cancelRequest = async (id) => {
    await RequestService.cancelOS(id)
      .then(function (response) {})
      .catch(function (error) {});
  };

  const AddEngineer = async (id) => {
    await RequestService.AddEngineer(id, userLogin)
      .then(function (response) {})
      .catch(function (error) {});
  };

  const requestDetails = async (id) => {
    history(`/request-details/${id}`);
  };

  return (
    <DashboardCard title="Lista de ordens de Serviço">
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
                  Numero
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Título
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => requestDetails(request.id)}
                  >
                    {request.identificationNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => requestDetails(request.id)}
                  >
                    {request.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => requestDetails(request.id)}
                  >
                    {statusRequest[request.status]}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    <IconButton aria-label="delete" onClick={() => editRequest(request.id)}>
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton aria-label="Close" onClick={() => cancelRequest(request.id)}>
                      <CloseIcon />
                    </IconButton>
                    {engineer && (
                      <IconButton aria-label="Personal" onClick={() => AddEngineer(request.id)}>
                        <PersonAddIcon />
                      </IconButton>
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default DashboardRequestList;
