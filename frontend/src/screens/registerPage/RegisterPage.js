import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import MainScreen from "../../components/mainscreen/MainScreen";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de Registrar un usuario
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const RegisterPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (userInfo) {
      history.push("/diario");
    } else {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("emotionsInfo");
      localStorage.removeItem("tagsInfo");
    }
  }, [history, userInfo]);

  /**
  * @desc La funcion se encarga de verificar si se puede registrar 
  * con la funcion importada register
  * @param e se utiliza para detener una acción por omisión con e.PreventDefault()
  */
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Las contraseñas no coinciden");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <MainScreen title="Registro">
      <div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="plain-text">Nombre de usuario</Form.Label>
            <Form.Control
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId="confirmPassword">
            <Form.Label className="plain-text">
              Confirma la contraseña
            </Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="flex-container">
            <Button className="button" variant="primary" type="submit">
              Registrarse
            </Button>
            <Col>
              <div className="plain-text">¿ Ya tienes una cuenta ?</div>
              <Link to="/login" className="plain-text">
                Inicia sesión aquí
              </Link>
            </Col>
          </div>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
