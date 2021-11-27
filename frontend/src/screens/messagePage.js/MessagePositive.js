import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * del mensaje positivo
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const MessagePositive = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      }
    }
  });

  const consejo = () => {
    var num = Math.floor(Math.random() * (3 + 1 - 1) + 1);
    if (num === 1) {
      return "Te recomiendo que te organices y pienses qué puedes hacer para animarte y emplea tus descansos en cosas que te gusten.";
    } else if (num === 2) {
      return "Enfócate en lo SÍ tienes, lo que no está no hace falta.";
    } else {
      return "Mañana será mejor, hoy fue un día a lo mejor sin mucho saboor, pero recuerda que solo tú te puedes animar y yo siempre te voy a  apoyar.";
    }
  };

  return (
    <MainScreen title="¡Tiempo de actitudes proactivas!">
      <Container>
        <Col>
          <div className="Centrado">
            <p className="subtitle-text-blue">{consejo()}</p>
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
