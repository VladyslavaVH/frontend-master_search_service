import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRole } from './authSlice';
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRole }) => {
    const token = useSelector(selectCurrentToken);
    ///const role = useSelector(selectCurrentRole);
    const location = useLocation();

    const decoded = token
    ? jwt_decode(token)
    : undefined;

    const role = decoded?.userInfo?.role || undefined;

  return (
    role === allowedRole
    ? <Outlet />
    : token
      ? <Navigate to="/unauthorized" state={{ from: location }} replace />//unauthorized
      //: <Navigate to="/" state={{ from: location, startLoginPopup: true }} replace />//login
      : <h1>isRefreshing...</h1>//login
  );
}

export default RequireAuth;
