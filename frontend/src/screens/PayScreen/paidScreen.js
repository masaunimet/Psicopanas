import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";
import "../../styles/App.css";
import Loading from "../../components/Loading";

const PaySreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [nombre, setnombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, settelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      }
    }
  });

  const sendEmail = (e) => {
    e.preventDefault();

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
          alert(result.text);
        },
        (error) => {
          alert(error.text);
        }
      );

    e.target.reset();
  };

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="subtitle-text-blue">Instrucciones</div>
          <ol className="plain-text">
            <li>Hacer el pago por: 10Bs</li>
            <li>Llenar los campos de texto</li>
            <li>Enviar un comprobante del pago por medio de una foto</li>
            <li>Esperar que cargue la imagen</li>
            <li>
              Esperar 1 a 2 dias a que se haga pago y aprovechar los beneficios
            </li>
          </ol>
        </div>
        <div>
          <div className="subtitle-text-blue">
            Especificaciones de la cuenta bancaria
          </div>
          <ul className="plain-text">
            <li>Número de cuenta:</li>
            <li>Tipo de banco:</li>
            <li>Cedula:</li>
            <li>Nombre:</li>
            <li>Telefono:</li>
            <li>Correo:</li>
          </ul>
        </div>
      </div>

      <Card>
        <Card.Body>
          <Form onSubmit={sendEmail}>
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
              <Form.Label className="plain-text">Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label className="plain-text">telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="04## 222 2222"
                value={telefono}
                onChange={(e) => settelefono(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label className="plain-text">Foto del pago</Form.Label>
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
    </MainScreen>
  );
};

export default PaySreen;
