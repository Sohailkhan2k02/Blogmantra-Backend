import { UploadIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Dropzone from 'react-dropzone'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { profilePhotoUploadAction } from "../../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";



//Css for dropzone 

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

//form schema 
const formSchema = Yup.object({
  image: Yup.string().required("Image is required"),
})

export default function UploadProfilePhoto() {
  //dispatch 
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      image : "",
    },
    onSubmit : values=>{
      dispatch(profilePhotoUploadAction(values));
    },
    validationSchema: formSchema,
  })
  //select profile data from store
  const users = useSelector(state=>state.users);
  const {profileUpload, loading , appErr, serverErr, userAuth} = users;

  //navigate 
  const navigate = useNavigate();
  if(profileUpload){
    navigate(`/profile/${userAuth?._id}`)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Upload profile photo
        </h2>
        {/* Displya err here */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Image container here thus Dropzone */}
            {appErr || serverErr ? (<h1 className="text-center text-red-500">{appErr} {serverErr}</h1>) : null}
            <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/jpeg, image/png"
                    onDrop={acceptedFiles => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: event => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
            <div className="text-red-500">
              {formik.touched.image && formik.errors.image}
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF minimum size 400kb uploaded only 1 image
            </p>

            <div>
              {loading? (<button
                disabled
                className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-800 bg-gray-400">
                <UploadIcon
                  className="-ml-1 mr-2 h-5  text-gray-400"
                  aria-hidden="true"
                />
                <span>Loading, Please wait...</span>
              </button>) : (<button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                <UploadIcon
                  className="-ml-1 mr-2 h-5  text-white"
                  aria-hidden="true"
                />
                <span>Upload Photo</span>
              </button>)}
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
