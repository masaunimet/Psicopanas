import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/mainscreen/MainScreen";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de Login
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (userInfo) {
      if (userInfo?.isAdmin === false) {
        history.push("/diario");
      } else {
        history.push("/admin");
      }
    } else {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("emotionsInfo");
      localStorage.removeItem("tagsInfo");
    }
  }, [history, userInfo]);

  /**
  * @desc La funcion se encarga de verificar si se puede logear 
  * con la funcion importada login
  * @param e se utiliza para detener una acción por omisión con e.PreventDefault()
  */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen title="Iniciar sesión">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="plain-text">Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="plain-text">Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="flex-container">
            <Button className="button" variant="primary" type="submit">
              Iniciar sesión
            </Button>
            <Col className="plain-text">
              ¿Eres nuevo? <Link to="/registro">Crea una cuenta aquí</Link>
            </Col>
          </div>
        </Form>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
