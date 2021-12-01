import React, { useEffect } from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/goti.gif";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * del mensaje triste
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const MessageSad = ({ history }) => {
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
      return "Todo pasa, no hay mal que dure cien años ni gota que lo aguante. Respira y sé paciente que todo va a mejorar. Ya verás.";
    } else if (num === 2) {
      return "Dedica tiempo contigo, imagina que es una cita, quizás necesitas descansar. Recuerda: No estás solo. ATT: Goti, una gota de bienestar.";
    } else {
      return "Cada cierto tiempo es bueno que recuerdes que eres buena persona, un error no te hace mal ser humano, un mal momento, no hace una mala vida.";
    }
  };

  return (
    <MainScreen title="¿Te puedo enviar un abrazo?">
      <Container>
        <div className="Centrado">
          <p className="subtitle-text-blue">{consejo()}</p>
        </div>
        <div className="Centrado">
          <Image
            src={Goti}
            width="250"
            height="250"
            alt="Goti"
            roundedCircle
            className="goti-box"
          />
        </div>
        <Row className="Centrado" style={{ marginTop: "10px" }}>
          <Link to="/authdiario">
            <Button style={{ border: "none" }}>Continuar</Button>
          </Link>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MessageSad;
