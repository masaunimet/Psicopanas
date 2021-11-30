import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageSad = ({ history }) => {
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

  const consejo = () => {
    var num = Math.floor(Math.random() * (3 + 1 - 1) + 1);
    if (num === 1) {
      return "Todo pasa, no hay mal que dure cien años ni gota que lo aguante. Respira y sé paciente que todo va a mejorar. Ya verás.";
    } else if (num === 2) {
      return "Dedica tiempo contigo, imagina que es una cita, quizás necesitas descansar. Recuerda: No estás solo. ATT: Goti, una gota de bienestar.";
    } else {
      return "Cada cierto tiempo es bueno que recuerdes que eres buena persona, un error no te hace mal ser humano, un mal momento, no hace una mala vida.";
    }
  };

  return (
    <MainScreen title="¿Te puedo enviar un abrazo?">
      <Container>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="Centrado">
            <p className="subtitle-text-blue">{consejo()}</p>
          </div>
          <div className="Centrado">
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
            <Button style={{ border: "none" }}>Continuar</Button>
          </Link>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MessageSad;
