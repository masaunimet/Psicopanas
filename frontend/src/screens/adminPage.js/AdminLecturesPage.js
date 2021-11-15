import React, { useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/mainscreen/MainScreen";
import moment from "moment";
import "../../styles/App.css";

const AdminLecturesPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [loading, setloading] = useState(true);

  const createLecture = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      content === "" ||
      image === "" ||
      publicationDate === ""
    ) {
      setPicMessage("No hay llenado todos los campos");
    } else {
      setPicMessage(
        title + "," + content + "," + image + "," + moment(publicationDate)
      );
    }
  };

  const postDetails = (pics) => {
    setPicMessage(null);
    setloading(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "psicopanas");
      data.append("cloud_name", "psicopanas");
      fetch("https://api.cloudinary.com/v1_1/psicopanas/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(setImage);
          setloading(false);
          setPicMessage("Se ha subido la imagen");
        })
        .catch((err) => {
          console.log(err);
          setPicMessage(
            "Ha ocurrido un error al cargar la imagen. Inténtelo nuevamente"
          );
        });
    } else {
      return setPicMessage("Por favor, seleccione una imagen");
    }
  };

  return (
    <MainScreen title="Lecturas">
      <Container>
        <Col>
          <Card className="no-background">
            <Card.Header className="subtitle-text-blue no-background-bb">
              Formulario de Creación de Lecturas
            </Card.Header>
            <Card.Body>
              <Form onSubmit={createLecture}>
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group controlId="title">
                  <Form.Label className="plain-text">Título</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label className="plain-text">Contenido</Form.Label>
                  <Form.Control
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="date">
                  <Form.Label className="plain-text">
                    Fecha de Publicación
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label className="plain-text">Imagen</Form.Label>
                  <Form.File
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="image/png"
                    label="Agregue una foto para la lectura"
                    custom
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
      </Container>
    </MainScreen>
  );
};

export default AdminLecturesPage;
