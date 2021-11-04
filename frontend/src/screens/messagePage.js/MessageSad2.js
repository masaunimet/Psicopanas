import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageSad2 = () => {
  return (
    <MainScreen title="Estaré a tu lado en esto">
      <Container>
        <Col>
          <div className="Centrado">
            <p className="subtitle-text-blue">
              Dedica tiempo contigo, imagina que es una cita, quizás necesitas
              descansar. Recuerda: No estás solo. ATT: Goti, una gota de
              bienestar.
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

export default MessageSad2;
