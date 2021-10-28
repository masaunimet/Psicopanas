import React,{useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";

const PaySreen = ({ history }) => {

    const [nombre, setnombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, settelefono] = useState("");
    const [foto, setFoto] = useState("");

    const sendEmail = (e) => {

        e.preventDefault();
    
        emailjs.send('service_tcenvkb', 'template_8lzky6r', {
            nombre: nombre,
            email: email,
            telefono: telefono,
            comprobante: "asasasas",}
        , 'user_5YxUS0Avd5jMNvVqxzLkf')
          .then((result) => {
              alert(result.text);
          }, (error) => {
            alert(error.text);
          });

          e.target.reset();
      };

    const sendInfo = () =>{


    }

    return(
        <MainScreen title="Pago Premium">
            <Card
            style={{
              background: "white",
              border: "none",
            }}>
                <Card.Body>
                    <Form onSubmit={sendEmail}> 
                    <Form.Group controlId="title">
                        <Form.Label >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Marco Polo"
                            value={nombre}
                            onChange={(e) => setnombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label >Correo electronico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="correo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label >telefono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="04## 222 2222"
                            value={telefono}
                            onChange={(e) => settelefono(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Foto del pago</Form.Label>
                        <Form.Control type="file" name="comprobante" value={foto} onChange={(e) => setFoto(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar comprobante
                    </Button>
                    </Form>  
                </Card.Body>
            </Card>
        </MainScreen>
    );
};

export default PaySreen;