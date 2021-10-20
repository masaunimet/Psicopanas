import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import { Button, Form } from "react-bootstrap";
import { authDiary } from "../../actions/userActions";

const AuthDiaryPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [tryDiaryPassword, setTryDiaryPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.diarySecurity === false) {
        dispatch(authDiary(true));
        history.push("/diario");
      } else {
        dispatch(authDiary(false));
      }
    }
  }, [dispatch, history, userInfo]);

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

  function isEmpty(str) {
    if (/\s/.test(str)) {
      return true;
    }
    return !str || 0 === str.length;
  }

  return (
    <MainScreen title="Diario">
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña de mi diario</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              onChange={(e) => setTryDiaryPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Continuar
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default AuthDiaryPage;
