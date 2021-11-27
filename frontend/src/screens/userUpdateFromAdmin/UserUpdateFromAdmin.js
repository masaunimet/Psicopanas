import React, { useEffect } from "react";
import { changeUserStatus } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * vacia
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const UserUpdateFromAdmin = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
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
