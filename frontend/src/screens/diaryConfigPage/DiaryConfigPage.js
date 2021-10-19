import React, { useState, useEffect } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import {
  diarySetNoSecurity,
  diarySetPersonalStats,
  diarySetSecurity,
} from "../../actions/userActions";

const DiaryConfigPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [message2, setMessage2] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [personalTags, setPersonalTags] = useState(null);
  const [diarySecurity, setDiarySecurity] = useState("");
  const [diaryPassword, setDiaryPassword] = useState("");
  const [confirmdiarypassword, setConfirmDiaryPassword] = useState("");
  const [updateDiaryPassword, setUpdateDiaryPassword] = useState("");
  const [dataTag1, setTag1] = useState("");
  const [dataTag2, setTag2] = useState("");
  const [dataTag3, setTag3] = useState("");
  const [dataTag4, setTag4] = useState("");
  const [dataTag5, setTag5] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPersonalTags(userInfo.personalTags);
      setDiarySecurity(userInfo.diarySecurity);
      setDiaryPassword(userInfo.diaryPassword);
      setTag1(userInfo.personalTags[0]);
      setTag2(userInfo.personalTags[1]);
      setTag3(userInfo.personalTags[2]);
      setTag4(userInfo.personalTags[3]);
      setTag5(userInfo.personalTags[4]);
    }
  }, [history, userInfo]);

  const submitHandlerSecurity = async (e) => {
    e.preventDefault();
    if (isEmpty(diaryPassword) || isEmpty(confirmdiarypassword)) {
      setMessage("Llene los campos, no se aceptan caracteres en blanco");
    } else if (diaryPassword !== confirmdiarypassword) {
      setMessage("Las contraseñas no coinciden");
    } else {
      dispatch(
        diarySetSecurity({
          _id: userInfo._id,
          name,
          email,
          password,
          personalTags,
          diaryPassword,
        })
      );
      setMessage(null);
      history.push("/diario");
    }
  };

  const submitHandlerNoSecurity = async (e) => {
    e.preventDefault();
    if (diaryPassword === updateDiaryPassword) {
      dispatch(
        diarySetNoSecurity({
          _id: userInfo._id,
          name,
          email,
          password,
          personalTags,
          diaryPassword,
        })
      );
      history.push("/diario");
      setMessage(null);
    } else {
      setMessage("Las contraseñas no coinciden");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const arrayTags = [];
    if (!isEmpty(dataTag1)) {
      arrayTags.push(dataTag1);
    }
    if (!isEmpty(dataTag2)) {
      arrayTags.push(dataTag2);
    }
    if (!isEmpty(dataTag3)) {
      arrayTags.push(dataTag3);
    }
    if (!isEmpty(dataTag4)) {
      arrayTags.push(dataTag4);
    }
    if (!isEmpty(dataTag5)) {
      arrayTags.push(dataTag5);
    }
    dispatch(
      diarySetPersonalStats({
        _id: userInfo._id,
        name,
        email,
        password,
        personalTags: arrayTags,
        diaryPassword,
      })
    );
    setMessage2("Se han guardado los cambios");
    history.push("/diario");
  };
  function isEmpty(str) {
    if (/\s/.test(str)) {
      return true;
    }
    return !str || 0 === str.length;
  }

  return (
    <MainScreen title="Configuración de mi diario">
      <Link to="/diario">
        <Button
          variant="secondary"
          style={{ border: "none", width: "100%", fontSize: "15px" }}
        >
          Volver a mi diario
        </Button>
      </Link>
      <Card
        style={{
          background: "none",
          border: "none",
        }}
      >
        <Card.Header style={{ display: "flex", background: "none" }}>
          <div
            style={{
              marginRight: "10px",
              color: "#AB2975",
              fontSize: "20px",
              fontWeight: "bold",
              background: "none",
            }}
          >
            Seguridad de mi diario
          </div>
        </Card.Header>

        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {diarySecurity === false ? (
          <div className="loginContainer">
            <Form
              onSubmit={submitHandlerSecurity}
              style={{ background: "none" }}
            >
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  onChange={(e) => setDiaryPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  onChange={(e) => setConfirmDiaryPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ border: "none" }}
              >
                Activar seguridad
              </Button>
            </Form>
          </div>
        ) : (
          <div className="loginContainer">
            <Form
              onSubmit={submitHandlerNoSecurity}
              style={{ background: "none" }}
            >
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña de mi diario</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  onChange={(e) => setUpdateDiaryPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ border: "none" }}
              >
                Desactivar seguridad
              </Button>
            </Form>
          </div>
        )}
      </Card>
      <Card
        style={{
          background: "none",
          border: "none",
        }}
      >
        {message2 && <ErrorMessage variant="info">{message2}</ErrorMessage>}
        <Card.Header style={{ display: "flex", background: "none" }}>
          <div
            style={{
              marginRight: "10px",
              color: "#AB2975",
              fontSize: "20px",
              fontWeight: "bold",
              background: "none",
            }}
          >
            Mis actividades personalizadas
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="tag1">
              <Form.Control
                type="text"
                value={dataTag1}
                id="inputTag1"
                onChange={(e) => setTag1(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tag2">
              <Form.Control
                type="text"
                value={dataTag2}
                id="inputTag2"
                onChange={(e) => setTag2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tag3">
              <Form.Control
                type="text"
                value={dataTag3}
                id="inputTag3"
                onChange={(e) => setTag3(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tag4">
              <Form.Control
                type="text"
                value={dataTag4}
                id="inputTag4"
                onChange={(e) => setTag4(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tag5">
              <Form.Control
                type="text"
                value={dataTag5}
                id="inputTag5"
                onChange={(e) => setTag5(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ border: "none" }}>
              Guardar cambios en mis actividades
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default DiaryConfigPage;
