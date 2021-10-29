import React, { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import "./ProfilePage.css";
import moment from "moment";

const ProfilePage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  });

  return (
    <MainScreen title="Perfil">
      <Container>
        <Row>
          <Image
            src={userInfo?.profilePicture}
            width="150"
            height="150"
            alt="Foto de perfil"
            roundedCircle
          />
        </Row>
        <Row className="profileData">
          <span>Nombre de usuario:</span> {userInfo?.name}
        </Row>
        <Row className="profileData">
          <span>Correo electrónico: </span> {userInfo?.email}
        </Row>
        <Row className="profileData">
          <span>Fecha de registro:</span>
          {moment(userInfo?.createdAt).format("YYYY-DD-MM")}
        </Row>

        <Row>
          <Button className="button" href="/modificarPerfil">
            Modificar Perfil
          </Button>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default ProfilePage;
