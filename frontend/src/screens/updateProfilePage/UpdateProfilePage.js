import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de editar perfil
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const UpdateProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [imageUploaded, setimageUploaded] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      } else {
        setName(userInfo.name);
        setProfilePicture(userInfo.profilePicture);
      }
    }
  }, [history, userInfo]);

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
          setProfilePicture(data.url.toString());
          setimageUploaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Por favor, seleccione una imagen");
    }
  };

  /**
  * @desc La funcion se encarga de llamar a la funcion del action importado llamado
  * updateProfile con los parametros de tu informacion
  * @param e se utiliza para detener una acción por omisión con e.PreventDefault()
  */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, password, profilePicture }));
    setimageUploaded(false);
  };

  return (
    <MainScreen title="Modificar Perfil">
      <Row>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={profilePicture}
            alt={name}
            className="profilePic"
            width="300"
            height="300"
            alt="Foto de perfil"
            roundedCircle
          />
        </Col>
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            {success && (
              <ErrorMessage variant="danger">
                Se han actualizado los datos
              </ErrorMessage>
            )}
            {imageUploaded && (
              <ErrorMessage variant="danger">
                Se ha subido la imagen por favor guarde los cambios
              </ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label className="plain-text">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                autocomplete="off"
                className="plain-text"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="plain-text">Contraseña nueva</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="off"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label className="plain-text">
                Confirme la nueva contraseña
              </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autocomplete="off"
              ></Form.Control>
            </Form.Group>{" "}
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="pic">
              <Form.Label className="plain-text">
                Cambie la foto de perfil
              </Form.Label>
              <Form.File
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="image/png"
                label="Seleccione una imagen de perfil"
                custom
              />
            </Form.Group>
            <Row>
              <Col>
                <Button href="perfil" className="button-all-page">
                  Volver al perfil
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="secondary"
                  className="button-all-page"
                >
                  Guardar cambios
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </MainScreen>
  );
};

export default UpdateProfilePage;
