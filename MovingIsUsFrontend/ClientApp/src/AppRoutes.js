import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { RequireAuth } from './RequireAuth';

const AppRoutes = [
  {
    index: true,
    element:<RequireAuth><Home /></RequireAuth>
  },
  {
    path: '/',
    element:<RequireAuth><Home /></RequireAuth>
  },
  {
    path: '/counter',
    element: <RequireAuth><Counter /></RequireAuth>
  },
  {
    path: '/fetch-data',
    element:<RequireAuth><FetchData /></RequireAuth> 
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default AppRoutes;
