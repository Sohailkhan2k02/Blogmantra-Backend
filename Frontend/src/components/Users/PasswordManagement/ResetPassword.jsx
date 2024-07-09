import { LockClosedIcon } from "@heroicons/react/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { passwordResetAction } from "../../../redux/slices/users/usersSlices";
import { useEffect } from "react";


//form schema 
const formSchema = Yup.object({
  password: Yup.string().required("Password is required"),
})

const ResetPassword = () => {
  //get token from params
  const location = useLocation();
  const token = location.pathname.split('/')[2];
  
  //dispatch
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      const data ={
        password : values?.password,
        token,
      }
      //dispatch action
      dispatch(passwordResetAction(data));
      console.log(data);
    },
    validationSchema: formSchema,
  })
  //select passwordToken data form store
  const users = useSelector(state => state?.users);
  const { resetPassword, loading, appErr, serverErr } = users

  //navigate
  const navigate = useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      if(resetPassword) navigate('/login')
    }, [5000])
  }, [resetPassword]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* error message  */}
          {appErr || serverErr ? (<h1 className="text-center text-red-500 text-lg">{appErr} {serverErr}</h1>) : null}
          {/* success message  */}
          {resetPassword && (<h1 className="text-center text-green-600 text-lg">Password Successfully reset. You will be Redirect to login within 5 seconds</h1>)}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Password Reset
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Reset your password if you have forgotten
            </a>
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Enter Your New Password
              </label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                type="password"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
                placeholder="Enter New Password"
              />
            </div>
            {/* Err message */}
            <div className="text-red-500 mb-2">
              {formik.touched.password && formik.errors.password}
            </div> 
          </div>
          <div>
            {loading ? (
              <button
                disabled
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
                Loading, please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
                Reset Password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
