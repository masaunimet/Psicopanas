import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageSad = () => {
  return (
    <MainScreen title="¿Te puedo enviar un abrazo?">
      <Container>
        <Col>
          <div className="Centrado">
          var num = Math.floor(Math.random() * (3 + 1 - 1) + 1);
            
            if (num === 1) {
            <p className="subtitle-text-blue">
              Todo pasa, no hay mal que dure cien años ni gota que lo aguante.
              Respira y sé paciente que todo va a mejorar. Ya verás.
            </p> }
            else if(num === 2){
            <p className="subtitle-text-blue">
              Dedica tiempo contigo, imagina que es una cita, quizás necesitas
              descansar. Recuerda: No estás solo. ATT: Goti, una gota de
              bienestar.
            </p>
            }else {
            <p className="subtitle-text-blue">
              Cada cierto tiempo es bueno que recuerdes que eres buena persona,
              un error no te hace mal ser humano, un mal momento, no hace una
              mala vida.
            </p>
            }
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

export default MessageSad;
