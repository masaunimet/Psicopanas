import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessagePositive2 = () => {
  return (
    <MainScreen title="¡VAMOOOS!">
      <Container>
        <Col>
          <div className="Centrado">
            <p className="subtitle-text-blue">
              Al menos no tuviste un mal día, siempre se puede estar peor, así
              que descansa que quizás lo necesitas.
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

export default MessagePositive2;
