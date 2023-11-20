import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { checkToken } from '../services/Auth';
import Loading from '../components/Loading';

import '../styles/PublicRoute.scss';

export default function PublicRoute() {
  const location = useLocation();
  const { isAuth } = checkToken(location.key);

  if (isAuth === 'Success') {
    return <Navigate to="/" />;
  }

  return (
    <div className="publicBackground">
      <Outlet />
    </div>
  );
}
