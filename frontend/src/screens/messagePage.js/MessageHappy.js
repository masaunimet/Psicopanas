import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

const MessageHappy = () => {
  return (
    <MainScreen title="¡Me alegro por tiii =) !">
      <Container>
        <Col>
          <div className="Centrado">
            
            var num = Math.floor(Math.random() * (3 + 1 - 1) + 1);
            if (num === 1) {
            <p className="subtitle-text-blue">
              Disfruta tu momentooooo, te lo mereces.
            </p> }
            else if(num === 2){
            <p className="subtitle-text-blue">
              La vida es solo una, rumbéate, celébrate y agradécete, porque eres
              grande.
            </p>
            } else{
              <p className="subtitle-text-blue">
              Mi luminoso solecito, así es, me alegro muchísimo por ti. Disfruta tu
              momento
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

export default MessageHappy;
