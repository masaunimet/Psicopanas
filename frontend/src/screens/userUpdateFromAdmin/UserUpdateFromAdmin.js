import React, { useEffect } from "react";

import { changeUserStatus } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const UserUpdateFromAdmin = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (match.params.id) {
      dispatch(changeUserStatus(match.params.id));
      history.push("/admin");
    }
  }, [dispatch, history]);

  return <></>;
};

export default UserUpdateFromAdmin;
