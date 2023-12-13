import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate, Link } from 'react-router-dom';
import Cookie from 'js.cookie';
import { BudgetService } from '../../../api/BudgetService';
import { UserService } from '../../../api/UserService';

export const DashboardCommentRequestList = ({ commentRequests,requestId }) => {
  const history = useNavigate();
  const userLogin = Cookie.get('email');
  const expires = Cookie.get('expires');
  const userType = Cookie.get('userType');

  const addCommentRequest = () => {
    history(`/create-comment-request/${requestId}`);
  };

  return (
    <DashboardCard title="Comentários">
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
                  Autor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Comentário
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Data de criação
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commentRequests.map((commentRequest) => (
              <TableRow key={commentRequest.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {commentRequest.userLogin}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {commentRequest.coment}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {commentRequest.createDate}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        onClick={addCommentRequest}
      >
        Adicionar Comentario
      </Button>
    </DashboardCard>
  );
};

export default DashboardCommentRequestList;
