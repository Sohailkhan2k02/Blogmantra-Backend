import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectRoute = ({children}) => {
    // Check if the user is admin
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  if(userAuth?.isAdmin){
    return children
  }
  else if(userAuth){
    return <Navigate to='/' />
  }
  return <Navigate to='/login' />
  
}

export default AdminProtectRoute