import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageVeryHappy = () => {
  return (
    <MainScreen title="¡ ESOOOOOOOOOOO XD !">
      <Container>
        <Col>
          
          var num = Math.floor(Math.random() * (3 + 1 - 1) + 1);
            
            if (num === 1) {
              <div className="Centrado">
            <p className="subtitle-text-blue">
              EH EH EH ¡¡Estamos celebrando contigoooo!!
            </p> 
            </div>
            } 
            else if(num === 2){
              <div className="Centrado">
            <p className="subtitle-text-blue">
              RUMBÉATE y CELÉBRATE, porque vida no hay 2 y como tú tampoco hay
              2.
            </p>
            </div>
            }else {
              <div className="Centrado">
            <p className="subtitle-text-blue">
              Báilale a la vida mientras la puedas cantar, la vida es como el
              mar, las olas las debes aprovechar, no esquivar.
            </p>
            
            </div>
            }

          

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

export default MessageVeryHappy;
