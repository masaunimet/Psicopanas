import React from "react";
import Media from "react-media";
import { Button, Container, Row } from "react-bootstrap";
import "../landingPage/LandingPage.css";
import Goti from "../../images/Goti.png";

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
        <Media query={{ maxWidth: 800 }}>
          {(matches) =>
            matches ? (
              <>
                <Row>
                  <div className="Centrado">
                    <h1 className="title">Bienvenido a PsicoPanas</h1>
                  </div>
                  <div className="Centrado">
                    <img src={Goti} width="200" height="250" alt="Goti" />
                  </div>
                </Row>
                <div>
                  <div className="buttonContainer">
                    <a href="/login">
                      <Button size="lg" className="landingButton">
                        Iniciar sesión
                      </Button>
                    </a>
                  </div>
                  <div className="buttonContainer">
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
              </>
            ) : (
              <>
                <Row>
                  <div className="welcome">
                    <img src={Goti} width="200" height="250" alt="Goti" />
                    <div className="intro-text">
                      <div>
                        <h1 className="title">Bienvenido a PsicoPanas</h1>
                        <p className="subtitle">
                          Una página para tu crecimiento personal
                        </p>
                      </div>
                    </div>
                  </div>
                </Row>
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
              </>
            )
          }
        </Media>
      </Container>
    </div>
  );
};

export default LandingPage;
