import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessagePositive = () => {
  return (
    <MainScreen title="¡Tiempo de actitudes proactivas!">
      <Container>
        <Col>
          <div className="Centrado">
          var num = Math.floor(Math.random() * (3 + 1 - 1) + 1);
            if (num === 1) {

            <p className="subtitle-text-blue">
              Te recomiendo que te organices y pienses qué puedes hacer para
              animarte y emplea tus descansos en cosas que te gusten.
            </p> }
            else if(num === 2){
            <p className="subtitle-text-blue">
              Al menos no tuviste un mal día, siempre se puede estar peor, así
              que descansa que quizás lo necesitas.
            </p>
            }else{
            <p className="subtitle-text-blue">
              Mañana será mejor, hoy fue un día a lo mejor sin mucho saboor,
              pero recuerda que solo tú te puedes animar y yo siempre te voy a
              apoyar.
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

export default MessagePositive;
