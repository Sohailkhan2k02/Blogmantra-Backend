import { LockClosedIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { generateResetPasswordTokenAction } from "../../../redux/slices/users/usersSlices";


//form schema 
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
})

const ResetPasswordForm = () => {
  //dispatch
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      //dispatch action
      dispatch(generateResetPasswordTokenAction(values?.email));
    },
    validationSchema: formSchema,
  })
  //select passwordToken data form store
  const users = useSelector(state => state?.users);
  const { passwordToken, loading, appErr, serverErr } = users

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* error message  */}
          {appErr || serverErr ? (<h1 className="text-center text-red-500 text-lg">{appErr} {serverErr}</h1>) : null}
          {/* success message  */}
          {passwordToken && (<h1 className="text-center text-green-600 text-lg">Email Successfully sent to your email address. Check your email inbox to reset your password</h1>)}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Password Reset Form
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
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
                Enter Your Email Address
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {/* Err message */}
            <div className="text-red-500 mb-2">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to={`/update-password`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Or Update Your Password ?
              </Link>
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

export default ResetPasswordForm;
