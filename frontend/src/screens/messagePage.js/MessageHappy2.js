import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageHappy2 = () => {
  return (
    <MainScreen title="¡Esoooo =) !">
      <Container>
        <Col>
          <div className="Centrado">
            <p className="subtitle-text-blue">
              La vida es solo una, rumbéate, celébrate y agradécete, porque eres
              grande.
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

export default MessageHappy2;
