import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "../landingPage/LandingPage.css";
const LandingPage = () => {
  //useEffect(() => {
  //const userInfo = localStorage.getItem("userInfo");

  //if (userInfo) {
  //history.push("/diario");
  //}
  //}, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <h1 className="title">Bienvenido a PsicoPanas</h1>
            <p className="subtitle">Una página para tu crecimiento personal</p>
          </div>
          <div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingButton">
                  Iniciar sesión
                </Button>
              </a>
              <a href="/registro">
                <Button
                  size="lg"
                  className="landingButton"
                  variant="outline-primary"
                >
                  Crear una cuenta
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
