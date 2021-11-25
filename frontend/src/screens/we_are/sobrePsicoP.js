import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../landingPage/LandingPage.css";
import { useSelector } from "react-redux";
import MainScreen from "../../components/mainscreen/MainScreen";
import i1 from "../../images/instrucc_paso1.png";
import i2 from "../../images/instrucc_paso2.png";
import i3 from "../../images/instrucc_paso3.png";
import i4 from "../../images/instrucc_paso4.png";
import i5 from "../../images/instrucc_paso5.png";

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
        <Row>
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
                Presiona crear entrada. Pincha el lápiz para Editar entrada.
                Cliquea el la entrada para ver su contenido.
              </p>
            </div>
          </Col>
        </Row>
        <div className="Centrado">
          <h2 className="subtitle-centered-text-blue">Entradas</h2>
          <p className="subtitle">
            Colócale el título y selecciona tu emoción general del día. Luego
            tienes una amplia variedad de actividades. E incluso puedes
            personalizarlas pincha el lápiz si deseas crear actividades. Y
            finalmente nárrale a tu querido diario que Goti es tu confidente.
          </p>
        </div>
        <img src={i2} width="60%" alt="Editar" />

        <img src={i3} width="60%" alt="Editar" />
        <div className="Centrado">
          <h2 className="subtitle-centered-text-blue">Estadísticas</h2>
          <p className="subtitle">
            Por aquí puedes ver las estadísticas que te lleva Goti. Con gráficos
            de barras con la frecuencia de tus emociones registradas y a la
            izquierda tienes un top de tus emociones frecuentes.
          </p>
        </div>

        <img src={i4} width="60%" alt="Editar" />

        <div className="Centrado">
          <h2 className="subtitle-centered-text-blue">Configuración</h2>
          <p className="subtitle">
            Por aquí puedes modificar tu contraseña y tu perfil en general.
            Puedes activar seguridad. Y personalizar tus actividades de las
            entradas de diario. Recuerda salvar tus cambios.
          </p>
        </div>

        <img src={i5} width="60%" alt="Editar" />
      </Container>
    </MainScreen>
  );
};

export default SobrePsicoP;
