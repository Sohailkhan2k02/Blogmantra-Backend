import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCommentAction, updateCommentAction } from "../../redux/slices/comments/commentSlices";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const UpdateComment = () => {
  //dispatch
  const dispatch = useDispatch();
  //destructure id of comment from params
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  useEffect(()=>{
    dispatch(fetchCommentAction(id));
  }, [dispatch, id])
  //select comment form store
  const comments = useSelector(state=>state.comments);
  const{commentDetails, isUpdate} = comments;
  const formik = useFormik({
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: values => {
      const data = {
        id,
        description: values?.description,
      };
      dispatch(updateCommentAction(data));
    },
    validationSchema: formSchema,
  });
  
  //redirect
  const navigate = useNavigate();
  if(isUpdate){
    navigate('/posts')
  }
  return (
    <div className="h-96 flex justify-center items-center flex-col">
      <h1 className="text-xl text-black m-10">Update You comment</h1>
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="mt-1 flex max-w-sm m-auto"
        >
          <textarea
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            type="text"
            name="text"
            id="text"
            className="shadow-sm focus:ring-black  mr-2 focus:border-black block w-full p-2 border-2 sm:text-sm border-black rounded-md"
            placeholder="Update the comment"
          />

          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            Submit
          </button>
        </form>
        <div className="text-red-500 mb-2 mt-2">
          {formik.touched.description && formik.errors.description}
        </div>
      </div>
    </div>
  );
};

export default UpdateComment;
