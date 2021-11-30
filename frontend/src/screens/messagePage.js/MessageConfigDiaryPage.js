import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageConfigDiaryPage = ({ history }) => {
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
    <MainScreen title="Configuración de diario">
      <Container>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <p className="subtitle-text-blue">Se han guardado tus cambios</p>
          </div>
          <div>
            <img src={Goti} width="200" height="250" alt="Goti" />
          </div>
        </Row>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Link to="/authdiario">
            <Button className="button-all-page">Continuar</Button>
          </Link>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MessageConfigDiaryPage;
