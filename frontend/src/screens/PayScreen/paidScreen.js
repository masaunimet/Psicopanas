import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { Button, Card, Container, Form, Col, Row } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";
import "../../styles/App.css";
import Loading from "../../components/Loading";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de pagos
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const PaySreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [nombre, setnombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, settelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setloading] = useState(false);

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

  /**
  * @desc La funcion se encarga de enviar el email al equipo de PsicoPanas
  * @param e se utiliza para detener una acción por omisión con e.PreventDefault()
  */
  const sendEmail = (e) => {
    e.preventDefault();

    if (nombre === "" || email === "" || telefono === "" || foto === "") {
      alert("ingresa bien todos los campos");
    } else {
      emailjs
        .send(
          "service_tcenvkb",
          "template_8lzky6r",
          {
            nombre: nombre,
            id_user: userInfo._id,
            email: email,
            telefono: telefono,
            comprobante: foto,
          },
          "user_5YxUS0Avd5jMNvVqxzLkf"
        )
        .then(
          (result) => {
            history.push("/mensaje_enviado");
          },
          (error) => {
            alert(error.text);
          }
        );

      e.target.reset();
    }
  };

  /**
  * @desc Permite subir la imagen al servicio de backend de imagenes llamada cloudinary
  * @param e imagen que se subira
  */
  const uploadImage = async (e) => {
    if (e.type === "image/jpeg" || e.type === "image/png") {
      const data = new FormData();
      data.append("file", e);
      data.append("upload_preset", "Comprobantes fotos");
      setloading(true);
      const res = await fetch(
        "	https://api.cloudinary.com/v1_1/dufc61kxr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();

      setFoto(file.secure_url);
      setloading(false);
    } else {
      console.log("error, no imagen");
    }
  };

  return (
    <MainScreen title="Pago Premium">
      <Container>
        <Row style={{ background: "#ffffff", border: "none" }}>
          <Col md={3}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div
                  className="subtitle-text-blue"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  ¿Cómo me hago Premium?
                </div>
                <div
                  className="plain-justify-text"
                  style={{ fontWeight: "bold" }}
                >
                  <div>
                    Haz una transferencia bancaria de 10Bs a la siguiente
                    cuenta:
                  </div>
                  <p></p>
                  <div>-Número de cuenta: XXXX-XXXX-XXXX-XXXX-XXXX</div>
                  <div>-Tipo de banco: Mercantil</div>
                  <div>-Cedula: 27.516.407</div>
                  <div>-Nombre: PsicoPanas</div>
                  <div>-Telefono: 0414 XXX XXXX</div>
                  <div>-Correo: psicopanasdmt@gmail.com</div>
                  <p></p>
                </div>
                <div
                  className="plain-justify-text"
                  style={{ fontWeight: "bold" }}
                >
                  <div>
                    Llenar el formulario y adjunta el comprobante de pago. Te
                    informaremos a tu correo cuando el pago esté confirmado y
                    podrás disfrutar los beneficios
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <Card style={{ background: "none", border: "none" }}>
              <Card.Body style={{ background: "none", border: "none" }}>
                <Form
                  onSubmit={sendEmail}
                  style={{ background: "none", border: "none" }}
                >
                  <Form.Group controlId="title">
                    <Form.Label className="plain-text">Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Marco Polo"
                      value={nombre}
                      onChange={(e) => setnombre(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group controlId="title">
                    <Form.Label className="plain-text">
                      Correo electrónico
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group controlId="title">
                    <Form.Label className="plain-text">Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="04## 222 2222"
                      value={telefono}
                      onChange={(e) => settelefono(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label className="plain-text">
                      Foto del pago
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={(e) => uploadImage(e.target.files[0])}
                    />
                  </Form.Group>

                  {loading ? (
                    <>
                      <div className="plain-centered-text">
                        Esperaremos a que subas la imagen
                      </div>
                      <Loading size={25} />
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="button-all-page"
                    >
                      Enviar comprobante
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default PaySreen;
