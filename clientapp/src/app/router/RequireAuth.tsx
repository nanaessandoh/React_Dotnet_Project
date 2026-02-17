import { useUser } from '../../lib/hooks/useUser';
import { Typography } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = () => {
    const { currentUser, loadingUserInfo } = useUser();
    const location = useLocation();

    if (loadingUserInfo) {
        return <Typography>Loading...</Typography>
    }

    if (!currentUser) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return (<Outlet />)
}

export default RequireAuth
