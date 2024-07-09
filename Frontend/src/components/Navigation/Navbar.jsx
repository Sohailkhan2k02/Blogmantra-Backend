import React from 'react'
import PublicNavbar from './Public/PublicNavbar'
import PrivateNavbar from './Private/PrivateNavbar'
import AdminNavbar from './Admin/AdminNavbar'
import { useSelector } from 'react-redux'
import AccountVerificationAlertWarning from './Alerts/AccountVerificationAlertWarning'
import AccountVerificationSuccessAlert from './Alerts/AccountVerificationSuccessAlert'

const Navbar = () => {
    //get user from store
    const users = useSelector(state => state.users);
    const { userAuth } = users;
    const isAdmin = userAuth?.isAdmin;

    //get account verification data form store
    const accVerification = useSelector(state => state.accVerification);
    const { token, loading, appErr, serverErr } = accVerification;

    return (
        <>
            {isAdmin ? <AdminNavbar isLogin={userAuth} /> : userAuth ? <PrivateNavbar isLogin={userAuth} /> : <PublicNavbar />}
            {/* Display alert */}
            {userAuth && !userAuth?.isVerified && <AccountVerificationAlertWarning />}
            {/* Display success */}
            {loading && <h2 className="text-center text-indigo-500">Loading please wait...</h2>}
            {token && <AccountVerificationSuccessAlert />}
            {appErr || serverErr ? (
                <h2 className="text-center text-red-500">
                    {serverErr} {appErr}
                </h2>
            ) : null}
        </>
    )
}

export default Navbar