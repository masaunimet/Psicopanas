import React, { useEffect } from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/goti.gif";
import "../../styles/App.css";

const MessageHappy = ({ history }) => {
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
      return "Disfruta tu momentooooo, te lo mereces";
    } else if (num === 2) {
      return "La vida es solo una, rumbéate, celébrate y agradécete, porque eres grande";
    } else {
      return "Mi luminoso solecito, así es, me alegro muchísimo por ti. Disfruta tu momento";
    }
  };

  return (
    <MainScreen title="¡Me alegro por tiii =)!">
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
            <Button style={{ border: "none" }}>Continuar</Button>
          </Link>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MessageHappy;
