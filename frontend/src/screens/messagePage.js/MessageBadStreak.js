import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import Goti from "../../images/Goti.png";

const MessageBadStreak = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  });
  return (
    <MainScreen title="Siento que te sientas así">
      <Container>
        <Col>
          <div className="Centrado">
            <p
              style={{
                color: "#0FA5AE", 
                fontWeight: "bold", 
                fontSize: "25px", 
              }}
            >
              No dudes en buscar apoyo.
              Recuerda darte tu tiempo para digerir lo que está sucediendo. Y trata de llevar las cosas con calma 

            </p>
            
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

export default MessageBadStreak;
