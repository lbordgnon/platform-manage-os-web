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
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate, Link } from 'react-router-dom';
import Cookie from 'js.cookie';
import { BudgetService } from '../../../api/BudgetService';

export const DashboardBudgetList = ({ budgets }) => {
  const history = useNavigate();
  const userType = Cookie.get('userType');

  const editBudget = async (id) => {
    history(`/create-budget/${id}`);
  };

  const approveBudget = async (id) => {
    await BudgetService.approveBudget(id)
      .then(function (response) {})
      .catch(function (error) {});
  };

  return (
    <DashboardCard title="Orçamentos">
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
                  Título
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  valor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Orçamento aprovado ?
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {budget.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {budget.value}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {budget.approvedBudget === true ? 'Aprovado' : 'Não aprovado'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {userType === 1 && (
                      <IconButton aria-label="edit" onClick={() => editBudget(budget.id)}>
                        <EditNoteIcon />
                      </IconButton>
                    )}
                    {userType === 2 && (
                      <IconButton aria-label="edit" onClick={() => approveBudget(budget.id)}>
                        <CheckIcon />
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

export default DashboardBudgetList;
