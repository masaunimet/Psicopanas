import React, { useEffect } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import moment from "moment";

const ProfilePage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
                  <Button className="button-all-page" href="/modificarPerfil">
                    Modificar Perfil
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
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
        </Row>
      </Container>
    </MainScreen>
  );
};

export default ProfilePage;
