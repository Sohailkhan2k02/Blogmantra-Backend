import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { blockUserAction, unblockUserAction } from "../../../redux/slices/users/usersSlices";

const UsersListItem = user => {
  //dispatch
  const dispatch = useDispatch();
  //send mail handle click
  const navigate = useNavigate();
  const sendMailNavigate = () => {
    navigate('/send-email', {
      state: {
        email: user?.user?.email,
        id: user?.user?._id,
      },
    });
  };
  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">{user?.user?.firstName}
                {user?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="p-3 text-xs text-purple-500 bg-purple-50 rounded-full">
              {user?.user?.accountType}
              {/* <span>{user?.user?.isBlocked && "Blocked"}</span> */}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user?.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-lg rounded bg-yellow-50">
              <span className="text-base mr-2  boder-2 text-bold text-yellow-500">
                {user?.user?.posts?.length} Posts
              </span>
            </p>
            <Link 
              to={`/profile/${user?.user?._id}`}
              className=" text-green-500 bg-green-50 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-lg rounded"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unblockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-100 text-black mr-2 mb-1 lg:mb-0 text-lg rounded"
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-red-50 text-red-500 mr-2 mb-1 lg:mb-0 text-lg rounded"
              >
                Block
              </button>
            )}

            <button
              onClick={sendMailNavigate}
              className="inline-flex  justify-center bg-black px-2  shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              <MailIcon
                className="-ml-1 mr-2 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-white">
                Message
              </span>
            </button>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
