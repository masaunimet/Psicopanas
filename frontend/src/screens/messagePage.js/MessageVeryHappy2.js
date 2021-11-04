import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageVeryHappy2 = () => {
  return (
    <MainScreen title="¡ WAOOOOO =D !">
      <Container>
        <Col>
          <div className="Centrado">
            <p className="subtitle-text-blue">
              RUMBÉATE y CELÉBRATE, porque vida no hay 2 y como tú tampoco hay
              2.
            </p>
          </div>
          <div className="Centrado">
            <img src={Goti} width="200" height="250" alt="Goti" />
          </div>
        </Col>
        <Row>
          <Link to="/authdiario">
            <Button style={{ border: "none" }}>Continuar</Button>
          </Link>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MessageVeryHappy2;
