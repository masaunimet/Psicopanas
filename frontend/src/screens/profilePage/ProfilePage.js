import React, { useEffect } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import moment from "moment";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de ver la informacion del perfil
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const ProfilePage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      }
    }
  });

  return (
    <MainScreen title="Perfil">
      <Container>
        <Row>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={userInfo?.profilePicture}
              alt=""
              className="profilePic"
              width="300"
              height="300"
              alt="Foto de perfil"
              roundedCircle
            />
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="name">
                <Form.Label className="plain-text">
                  Nombre de usuario
                </Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo?.name}
                  disabled
                  className="plain-text"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="plain-text">
                  Correo electrónico
                </Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo?.email}
                  disabled
                  className="plain-text"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className="plain-text">
                  Fecha de registro
                </Form.Label>
                <Form.Control
                  type="text"
                  value={moment(userInfo?.createdAt).format("YYYY-DD-MM")}
                  disabled
                  className="plain-text"
                ></Form.Control>
              </Form.Group>

              <Row>
                <Col>
                  <Button href="authDiario" className="button-all-page">
                    Volver al diario
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    className="button-all-page"
                    href="/modificarPerfil"
                  >
                    Modificar Perfil
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default ProfilePage;
