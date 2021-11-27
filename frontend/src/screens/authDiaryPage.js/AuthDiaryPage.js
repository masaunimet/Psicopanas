import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import { Button, Form } from "react-bootstrap";
import { authDiary } from "../../actions/userActions";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de poner la contraseña para acceder al diario personal
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const AuthDiaryPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [tryDiaryPassword, setTryDiaryPassword] = useState("");
  const [message, setMessage] = useState(null);

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      } else if (userInfo.diarySecurity === false) {
        dispatch(authDiary(true));
        history.push("/diario");
      } else {
        dispatch(authDiary(false));
      }
    }
  }, [dispatch, history, userInfo]);

  /**
  * @desc funcion encargada de verificar si la contraseña es correcta 
  * @param e se utiliza para detener una acción por omisión con e.PreventDefault()
  */
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isEmpty(tryDiaryPassword)) {
      setMessage("Ingrese la contraseña, no se aceptan caracteres en blanco");
    } else if (userInfo.diaryPassword !== tryDiaryPassword) {
      setMessage("La contraseña no es la correcta");
    } else {
      setMessage(null);
      dispatch(authDiary(true));
      history.push("/diario");
    }
  };

  /**
  * @desc Es la funcion encargada de ver si el parametro esta vacio o tiene caracteres en blanco
  * @param str es una varible string 
  * @returns booleano
*/
  function isEmpty(str) {
    if (/\s/.test(str)) {
      return true;
    }
    return !str || 0 === str.length;
  }

  return (
    <MainScreen title="Diario">
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      <div className="subtitle-text-blue">Bienvenido {userInfo.name}</div>
      <div>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="plain-text">
              Introduzca la contraseña de su diario
            </Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              onChange={(e) => setTryDiaryPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="button" variant="primary" type="submit">
            Continuar
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default AuthDiaryPage;
