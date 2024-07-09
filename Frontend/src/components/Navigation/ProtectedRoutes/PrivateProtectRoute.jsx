
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const PrivateProtectRoute = ({children}) => {
  // Check if the user is logged in
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  if(userAuth) { 
    return children
  } 
  return <Navigate to="/login" />
};

export default PrivateProtectRoute;
