import React from "react";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import "../landingPage/LandingPage.css";
import "../../styles/App.css";
import Goti from "../../images/goti.gif";
import love from "../../images/love.png";
import chat from "../../images/chat.png";
import diary from "../../images/diary.png";
import stats from "../../images/stats.png";
import MainScreen from "../../components/mainscreen/MainScreen";
import "../landingPage/LandingPage.css";

const AboutPsicoPanasPages = () => {
  return (
    <MainScreen title="">
      <Container>
        <Row className="welcome">
          <Col md={3} className="intro-text">
            <Image
              src={Goti}
              height="250px"
              width="250px"
              alt="Goti"
              roundedCircle
              className="goti-box"
            />
          </Col>
          <Col className="intro-text">
            <Row className="title">
              Bienvenido a <span className="brand">PsicoPanas</span>
            </Row>
            <Row className="subtitle">Tu gota de bienestar</Row>
            <Row className="normal-text">
              Este ahora es tu espacio, donde tienes tu diario personal. Donde
              Goti te aconseja. Aquí llevas tus emociones y Goti las
              estadísticas de ellas.
            </Row>
            <Row>
              <Col>
                <a href="https://youtu.be/YDvxCfknOk4" target="_blank">
                  <Button className="button" size="lg">
                    Ver video
                  </Button>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="welcome">
          <Row className="intro-text">
            <Col className="title2">¿Por qué elegirnos?</Col>
          </Row>
          <Row className="intro-text" style={{ background: "none" }}>
            <Col className="info-box" style={{ background: "none" }}>
              <Card>
                <Image
                  style={{ alignSelf: "center" }}
                  src={diary}
                  width="50px"
                  height="50px"
                  alt="Diario"
                  roundedCircle
                  className="img"
                ></Image>
                <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                  Diario Personal
                </p>
                <p>
                  Lleva un registro de tu día a día, tantas veces como las
                  necesites con nuestro diario y con el apoyo de Goti y sus
                  consejos para hacerte compañia
                </p>
              </Card>
            </Col>
            <Col className="info-box" style={{ background: "none" }}>
              <Card>
                <Image
                  style={{ alignSelf: "center" }}
                  src={chat}
                  width="50"
                  height="50"
                  alt="Foro"
                  className="img"
                  roundedCircle
                ></Image>
                <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                  Foro Chat
                </p>
                <p>
                  Puedes compartir tus ideas con nuestra comunidad bajo el
                  cuidado de Goti en el foro, donde podrás participar
                  anónimamente cuando lo desees
                </p>
              </Card>
            </Col>
            <Col className="info-box" style={{ background: "none" }}>
              <Card>
                <Image
                  style={{ alignSelf: "center" }}
                  src={stats}
                  width="50"
                  height="50"
                  alt="Estadísticas"
                  roundedCircle
                  className="img"
                ></Image>
                <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                  Estadísticas de diario
                </p>
                <p>
                  Goti se toma muy enserio su labor y te va avisando cómo ha
                  variado tu estado de ánimo a lo largo del mes y del año
                </p>
              </Card>
            </Col>
            <Col className="info-box" style={{ background: "none" }}>
              <Card>
                <Image
                  style={{ alignSelf: "center" }}
                  src={love}
                  width="50"
                  height="50"
                  alt="Consejos"
                  className="img"
                  roundedCircle
                ></Image>
                <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                  Orientados a tu bienestar
                </p>
                <p>
                  En PsicoPanas nos interesa tu bienestar y esperamos crear un
                  espacio para ti donde puedes reencontrarte contigo
                </p>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default AboutPsicoPanasPages;
