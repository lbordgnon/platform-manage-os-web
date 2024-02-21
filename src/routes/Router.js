import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';


const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));


const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const CreateOsPage = Loadable(lazy(() => import('../views/createOs/CreateOsPage')))
const CreateCommentRequest = Loadable(lazy(() => import('../views/CreateCommentRequest/CreateCommentRequest')))
const CreateBudget = Loadable(lazy(() => import('../views/createBudget/CreateBudget')))
const Budgets = Loadable(lazy(() => import('../views/dashboardBudget/Budgets')))
const Request = Loadable(lazy(() => import('../views/requestDetails/RequestDetails')))
const Reports = Loadable(lazy(() => import('../views/reports/Reports')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const EditUser = Loadable(lazy(() => import('../views/authentication/EditUser')));
const Csat = Loadable(lazy(() => import('../views/csat/csat')));
const SignupEngineer = Loadable(lazy(() => import('../views/signupEngineer/SignupEngineer')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/create-os/:idRequest?', exact: true, element: <CreateOsPage /> },
      { path: '/create-comment-request/:idRequest?', exact: true, element: <CreateCommentRequest /> },
      { path: '/request-details/:idRequest', exact: true, element: <Request /> },
      { path: '/create-budget/:idBudget?', exact: true, element: <CreateBudget /> },
      { path: '/budgets', exact: true, element: <Budgets /> },
      { path: '/reports', exact: true, element: <Reports /> },
      { path: '/edit-user', exact: true, element: <EditUser /> },
      { path: '/csat/:idRequest/:idEngineer', exact: true, element: <Csat /> },
      { path: '/signup-engineer', exact: true, element: <SignupEngineer /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
