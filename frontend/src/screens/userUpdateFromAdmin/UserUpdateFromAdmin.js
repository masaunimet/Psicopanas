import React, { useEffect } from "react";

import { changeUserStatus } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserUpdateFromAdmin = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === false) {
        history.push("/diario");
      } else if (match.params.id) {
        dispatch(changeUserStatus(match.params.id));
        history.push("/admin");
      }
    }
  }, [dispatch, history]);

  return <></>;
};

export default UserUpdateFromAdmin;
