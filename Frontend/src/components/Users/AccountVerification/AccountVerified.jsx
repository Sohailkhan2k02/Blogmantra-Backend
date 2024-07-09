import React, { useEffect } from "react";

import { CheckIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountVerificationAction } from "../../../redux/slices/accountVerification/accVerificationTokenSlices";
import { userLogoutAction } from "../../../redux/slices/users/usersSlices";

export default function AccountVerified() {
  //get token from params
  const location = useLocation();
  const token = location.pathname.split('/')[2];

  //dispatch 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountVerificationAction(token));
  }, [dispatch, token]);

  //select verified account from store
  const accVerification = useSelector(state => state.accVerification);
  const { verified, isVerified, loading, appErr, serverErr } = accVerification;


  return (
    <>
      {verified ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-400">
          <div className="inline-block align-bottom bg-slate-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <div
                  as="h3"
                  className="text-lg leading-6 font-medium text-black"
                >
                  Account Verified
                </div>
                <div className="mt-2">
                  <p className="text-sm text-black">
                    Your account is now verified. Logout and login back to see the
                    changes
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={() => dispatch(userLogoutAction())}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center bg-slate-100 items-center min-h-screen">
          <Link to="/"
            type="button"
            className="inline-flex justify-center  rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm">
              Go Home
          </Link>
        </div>
      )}
    </>
  );
}
