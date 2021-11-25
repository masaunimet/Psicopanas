import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../landingPage/LandingPage.css";
import { useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import i1 from "../../images/instrucc_paso1.png";
import i2 from "../../images/Configuracion.png";
import i3 from "../../images/Foro.png";

const SobrePsicoP = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  });

  return (
    <MainScreen title="Sobre PsicoPanas">
      <Container className="white-background">
        <Row style={{ marginTop: "10px", paddingTop: "10px" }}>
          <Col md={3}>
            <Image
              src={i1}
              width="100%"
              alt=""
              thumbnail
              style={{ border: "solid #0a656b" }}
            />
          </Col>
          <Col>
            <div className="Centrado">
              <div
                className="subtitle-centered-text-blue"
                style={{ width: "100%", fontSize: "25px" }}
              >
                Diario Personal
              </div>
            </div>
            <div>
              <p
                className="subtitle"
                style={{ fontSize: "20px", textAlign: "center" }}
              >
                En PsicoPanas cuentas con un diario personal que puedes utilizar
                para contar tus experiencias en el día a día y cómo te has
                sentido. Puedes crear cuantas entradas desees y podrás ver un
                resumen de tus cambios de ánimo del mes a través de las
                estadísticas y configurar tu diario como desees.
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px", paddingTop: "10px" }}>
          <Col md={3}>
            <Image
              src={i2}
              width="100%"
              alt=""
              thumbnail
              style={{ border: "solid #0a656b" }}
            />
          </Col>
          <Col>
            <div className="Centrado">
              <div
                className="subtitle-centered-text-blue"
                style={{ width: "100%", fontSize: "25px" }}
              >
                Configuración de Diario
              </div>
            </div>
            <div>
              <p
                className="subtitle"
                style={{ fontSize: "20px", textAlign: "center" }}
              >
                Puedes colocar contraseña a tu diario para tener seguridad
                extra. Así como crear hasta cinco actividades personalizadas
                para las entradas de tu diario. Además, si te suscribes a la
                opción PREMIUM puedes agregar otras 5 actividades más
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px", paddingTop: "10px" }}>
          <Col md={3}>
            <Image
              src={i3}
              width="100%"
              alt=""
              thumbnail
              style={{ border: "solid #0a656b" }}
            />
          </Col>
          <Col>
            <div className="Centrado">
              <div
                className="subtitle-centered-text-blue"
                style={{ width: "100%", fontSize: "25px" }}
              >
                Foro
              </div>
            </div>
            <div>
              <p
                className="subtitle"
                style={{ fontSize: "20px", textAlign: "center" }}
              >
                Una vez adquieres la versión PREMIUM puedes tener acceso a los
                diferentes foros que tenemos. En ellos puedes compartir tus
                experiencias y consejos con otros compañeros de PsicoPanas y con
                Goti, recuerda que en esta comunidad estamos para apoyarnos
                entre todos
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px", paddingTop: "10px" }}>
          <Col md={3}>
            <Image
              src={i3}
              width="100%"
              alt=""
              thumbnail
              style={{ border: "solid #0a656b" }}
            />
          </Col>
          <Col>
            <div className="Centrado">
              <div
                className="subtitle-centered-text-blue"
                style={{ width: "100%", fontSize: "25px" }}
              >
                Lecturas
              </div>
            </div>
            <div>
              <p
                className="subtitle"
                style={{ fontSize: "20px", textAlign: "center" }}
              >
                Regularmente puedes revisar el apartado de lecturas, donde
                encontrarás divertidas técnicas y consejos para ayudarte y
                servir de apoyo en el desarrollo y mejoramiento de tu
                inteligencia emocional.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default SobrePsicoP;
