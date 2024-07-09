import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../util/LoadingComponent";


const UsersList = () => {
  

  //select usersList form store
  const users = useSelector(state => state.users);
  const { usersList, loading, appErr, serverErr, block, unblock } = users;

  //dispatch 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  return (
    <>
      <section class="py-8 bg-slate-100 min-h-screen">
        {loading ? (<LoadingComponent />) : appErr || serverErr ? (
          <h3 className="text-center text-red-500 text-lg">{appErr} {serverErr}</h3>) : usersList?.length <= 0 ? (
            <h1 className="text-center text-red-500 text-lg">No users found</h1>
          ) : usersList?.map(user => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        }
      </section>
    </>
  );
};

export default UsersList;
