import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageVeryHappy = ({ history }) => {
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
      return "EH EH EH ¡¡Estamos celebrando contigoooo!!";
    } else if (num === 2) {
      return "RUMBÉATE y CELÉBRATE, porque vida no hay 2 y como tú tampoco hay 2";
    } else {
      return "Báilale a la vida mientras la puedas cantar, la vida es como el mar, las olas las debes aprovechar, no esquivar";
    }
  };

  return (
    <MainScreen title="¡ ESOOOOOOOOOOO XD !">
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

export default MessageVeryHappy;
