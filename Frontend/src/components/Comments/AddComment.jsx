import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postId }) => {
  //dispatch
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: values => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });
  //select comment data form store
  const comments = useSelector(state => state.comments);
  const { loading, appErr, serverErr } = comments;

  return (
    <div className="flex flex-col justify-center items-center">
      {appErr || serverErr ? (<h1 className="text-center text-red-500 text-lg pb-2">{appErr} {serverErr} </h1>) : null}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-black  mr-2 focus:border-slate-700 block w-full p-2 border-1 sm:text-sm border-black rounded-md"
          placeholder="Add New comment"
        />

        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-500"
          >
            Loading, please wait...
          </button>) : (
          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            Submit
          </button>
        )}
      </form>
      <div className="text-red-500 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
  );
};

export default AddComment;
