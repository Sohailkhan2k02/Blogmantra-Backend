import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { sendEmailAction } from "../../../redux/slices/email/emailSlices";


//form schema 
const formSchema = Yup.object({
  recepientEmail: Yup.string().required("Recepient Email is required"),
  subject: Yup.string().required("subject is required"),
  message: Yup.string().required("message is required"),
})

const SendEmail = () => {
  //dispatch
  const dispatch = useDispatch();
  //location
  const location = useLocation();
  const state = location.state; // Destructure the state object
  const { email, id } = state;

  //formik
  const formik = useFormik({
    initialValues: {
      recepientEmail: email,
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      //dispatch action
      dispatch(sendEmailAction(values));
    },
    validationSchema: formSchema,
  })

  //select email data from store
  const sendEmail = useSelector(state => state.sendEmail);
  const { isEmailSent, loading, appErr, serverErr } = sendEmail;

  //navigate 
  const navigate = useNavigate();
  if(isEmailSent){
    navigate(`/profile/${id}`)
  }
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Send Email Message
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          {/* {emailSent && <div>Sent</div>} */}
          {isEmailSent && (<h1 className="text-center text-green-500 text-lg">Email successfully sent</h1>)}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {serverErr || appErr ? (
              <h2 className="text-center text-red-500 text-xl">
                {serverErr} {appErr}
              </h2>
            ) : null}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Recipient Email
              </label>
              {/* Email message */}
              <div className="mt-1">
                <input
                  value={formik.values.recepientEmail}
                  onChange={formik.handleChange('recepientEmail')}
                  onBlur={formik.handleBlur('recepientEmail')}
                  disabled
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.recepientEmail && formik.errors.recepientEmail}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange('subject')}
                  onBlur={formik.handleBlur('subject')}
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Message
              </label>
              {/* email message */}
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange('message')}
                onBlur={formik.handleBlur('message')}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black bg-transparent focus:bg-transparent  border border-gray-200 focus:border-black  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
              {loading ?
                (<button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500"
                >
                  Loading, please wait...
                </button>) :
                (<button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  Send
                </button>)}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



export default SendEmail;