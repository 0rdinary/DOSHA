import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { checkToken } from '../services/Auth';

import '../styles/PrivateRoute.scss';
import Sidebar from '../components/Sidebar';

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuth } = checkToken(location.key);

  if (isAuth === 'Failed') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="privateBackground">
      <Header />
      <div className="temp" style={{ height: '90vh' }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
