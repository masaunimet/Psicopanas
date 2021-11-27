import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateLectureAction } from "../../actions/lectureActions";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/mainscreen/MainScreen";
import axios from "axios";
import moment from "moment";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de editar lecturas del Admin
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const AdminEditLecturePage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [picMessage, setPicMessage] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

   //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo?.isAdmin === false) {
        history.push("/");
      }
    }
  }, [dispatch, history, userInfo]);

  //encargada de agarrar la informacion desde la backend y ponerla en la pagina
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

  /**
  * @desc Llama al import Action, en especifico, updateLectureAction
  * para editar una lectura en el backend
  * @param e se utiliza para detener una acción por omisión con e.PreventDefault()
  */
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

  /**
  * @desc Permite subir la imagen al servicio de backend de imagenes llamada cloudinary
  * @param pics imagen que se subira
  */
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
