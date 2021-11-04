import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/mainscreen/MainScreen'
import Goti from "../../images/Goti.png";

const MessagePositive = () => {
    return (
        <MainScreen title="¡ HOY EL DÍA ES TUYO Y SOLO TUYO =D !">
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
                Báilale a la vida mientras la puedas cantar, la vida es como el mar, las olas las debes aprovechar, no esquivar. 
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
    )
}

export default MessagePositive