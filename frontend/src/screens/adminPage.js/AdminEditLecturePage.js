import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateLectureAction } from "../../actions/lectureActions";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/mainscreen/MainScreen";
import axios from "axios";
import moment from "moment";
import "../../styles/App.css";

const AdminEditLecturePage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [picMessage, setPicMessage] = useState();

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/lectures/edit/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setImage(data.image);
      setPublicationDate(data.publicationDate);
    };
    fetching();
  }, [match.params.id]);

  const updateLecture = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      content === "" ||
      image === "" ||
      publicationDate === ""
    ) {
      setPicMessage("No hay llenado todos los campos");
    } else {
      dispatch(
        updateLectureAction(
          match.params.id,
          title,
          content,
          image,
          moment(publicationDate).add(0, "days")
        )
      );
      history.push("/admin-listar-lecturas");
    }
  };

  const postDetails = (pics) => {
    setPicMessage(null);
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
              <Form onSubmit={updateLecture}>
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
                <Button
                  variant="primary"
                  type="submit"
                  className="button-all-page"
                >
                  Editar Lectura
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </MainScreen>
  );
};

export default AdminEditLecturePage;
