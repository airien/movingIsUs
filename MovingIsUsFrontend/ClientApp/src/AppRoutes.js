import { Orders } from "./components/Orders";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { RequireAuth } from './RequireAuth';
import { AddOrder } from './components/AddOrder';
import { EditOrder } from './components/EditOrder';

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
    path: '/addOrder',
    element: <RequireAuth><AddOrder/></RequireAuth>
  },
  {
    path: '/editOrder',
    element: <RequireAuth><EditOrder/></RequireAuth>
  },
  {
    path: '/orders',
    element:<RequireAuth><Orders /></RequireAuth> 
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default AppRoutes;
