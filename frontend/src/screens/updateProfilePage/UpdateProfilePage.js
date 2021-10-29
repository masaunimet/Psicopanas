import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const UpdateProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setProfilePicture(userInfo.profilePicture);
    }
  }, [history, userInfo]);

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
          console.log(profilePicture);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Por favor, seleccione una imagen");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, password, profilePicture }));
  };

  return (
    <MainScreen title="Modificar Perfil">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Se han actualizado los datos
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  autocomplete="off"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Contraseña nueva</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autocomplete="off"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirme la nueva contraseña</Form.Label>
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
                <Form.Label>Cambie la foto de perfil</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Seleccione una imagen de perfil"
                  custom
                />
              </Form.Group>
              <div>
                <Button type="submit" varient="primary">
                  Guardar cambios
                </Button>
                <Button href="perfil">Volver al perfil</Button>
              </div>
            </Form>
          </Col>
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
        </Row>
      </div>
    </MainScreen>
  );
};

export default UpdateProfilePage;
