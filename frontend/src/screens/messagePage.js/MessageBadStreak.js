import React, { useEffect } from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/goti.gif";
import "../../styles/App.css";

const MessageBadStreak = ({ history }) => {
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
      return "No dudes en buscar apoyo. Recuerda darte tu tiempo para digerir lo que está sucediendo";
    } else if (num === 2) {
      return "No dudes en buscar apoyo. Hay un mar de posibilidades en esta vida, tómatelo con calma y respira";
    } else {
      return "No dudes en buscar apoyo. Trata de llevar las cosas con calma";
    }
  };

  return (
    <MainScreen title="Siento que te sientas así">
      <Container>
        <div className="Centrado">
          <p className="subtitle-text-blue">{consejo()}</p>
        </div>

        <div className="Centrado">
          <Image
            src={Goti}
            width="250"
            height="250"
            alt="Goti"
            roundedCircle
            className="goti-box"
          />
        </div>
        <Row className="Centrado" style={{ marginTop: "10px" }}>
          <Link to="/authdiario">
            <Button className="button-all-page">Continuar</Button>
          </Link>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MessageBadStreak;
