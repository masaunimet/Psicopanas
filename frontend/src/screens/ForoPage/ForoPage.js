import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import Media from "react-media";
import {
  listForomessages,
  createForoMessage,
} from "../../actions/foromessageAction";
import {
  listForomessagessalud,
  createForoMessagesalud,
} from "../../actions/foromessagesaludAction";
import {
  listForomessagesvivencias,
  createForoMessagevivencia,
} from "../../actions/foromessagevivenciaAction";
import {
  listForomessageshobbies,
  createForoMessagehobbie,
} from "../../actions/foromessagehobbieAction";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Button, FormControl, Image } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import moment from "moment";
import "moment/locale/es";
import "../../styles/App.css";

const ForoPage = ({ history }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  moment.locale("es");
  const imgs = [
    "https://res.cloudinary.com/psicopanas/image/upload/v1637791867/Anonimo_h4g8dj.png",
  ];

  const [chatActual, setChatActual] = useState("General");

  const foromessageList = useSelector((state) => state.foromessageList);
  const {
    loading: loadingGeneral,
    error: errorGeneral,
    foromessages,
  } = foromessageList;

  const foromessagesaludList = useSelector(
    (state) => state.foromessagesaludList
  );
  const {
    loading: loadingSalud,
    error: errorSalud,
    foromessagessalud,
  } = foromessagesaludList;

  const foromessagevivenciaList = useSelector(
    (state) => state.foromessagevivenciaList
  );
  const {
    loading: loadingVivencias,
    error: errorVivencias,
    foromessagesvivencias,
  } = foromessagevivenciaList;

  const foromessagehobbieList = useSelector(
    (state) => state.foromessagehobbieList
  );
  const {
    loading: loadingHobbies,
    error: errorHobbies,
    foromessageshobbies,
  } = foromessagehobbieList;

  const [option, setOption] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      }
    }
  });

  useEffect(() => {
    dispatch(listForomessages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listForomessagessalud());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listForomessagesvivencias());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listForomessageshobbies());
  }, [dispatch]);

  function isEmpty(str) {
    return !str || 0 === str.length;
  }

  const submitHandlerAnon = (e) => {
    e.preventDefault();

    if (isEmpty(content.trim())) {
    } else {
      if (option === 0) {
        dispatch(createForoMessage("Anónimo", content, imgs[0]));
      } else if (option === 1) {
        dispatch(createForoMessagesalud("Anónimo", content, imgs[0]));
      } else if (option === 2) {
        dispatch(createForoMessagevivencia("Anónimo", content, imgs[0]));
      } else if (option === 3) {
        dispatch(createForoMessagehobbie("Anónimo", content, imgs[0]));
      }

      setContent("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isEmpty(content.trim())) {
    } else {
      if (option === 0) {
        dispatch(
          createForoMessage(userInfo.name, content, userInfo.profilePicture)
        );
      } else if (option === 1) {
        dispatch(
          createForoMessagesalud(
            userInfo.name,
            content,
            userInfo.profilePicture
          )
        );
      } else if (option === 2) {
        dispatch(
          createForoMessagevivencia(
            userInfo.name,
            content,
            userInfo.profilePicture
          )
        );
      } else if (option === 3) {
        dispatch(
          createForoMessagehobbie(
            userInfo.name,
            content,
            userInfo.profilePicture
          )
        );
      }

      setContent("");
    }
  };

  const forodisplay = () => {
    if (option === 0) {
      return foromessages
        ?.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
        .map((message) => (
          <div key={message._id} style={{ display: "flex", margin: "10px" }}>
            <div>
              <Image
                src={message.icon}
                width="50"
                height="50"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginLeft: "10px",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            >
              <div>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    color: "#053a3f",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {message.username}
                  <span
                    style={{
                      color: "#555",
                      fontWeight: "normal",
                      marginLeft: "10px",
                    }}
                  >
                    {moment(message.createdAt).fromNow()}
                  </span>
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    fontWeight: "bold",
                    backgroundColor: "#bcf4fc",
                    borderRadius: "15%",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ));
    } else if (option === 1) {
      return foromessagessalud
        ?.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
        .map((message) => (
          <div key={message._id} style={{ display: "flex", margin: "10px" }}>
            <div>
              <Image
                src={message.icon}
                width="50"
                height="50"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginLeft: "10px",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            >
              <div>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    color: "#053a3f",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {message.username}
                  <span
                    style={{
                      color: "#555",
                      fontWeight: "normal",
                      marginLeft: "10px",
                    }}
                  >
                    {moment(message.createdAt).fromNow()}
                  </span>
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    borderRadius: "15%",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    fontWeight: "bold",
                    backgroundColor: "#bcf4fc",
                  }}
                >
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ));
    } else if (option === 2) {
      return foromessagesvivencias
        ?.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
        .map((message) => (
          <div key={message._id} style={{ display: "flex", margin: "10px" }}>
            <div>
              <Image
                src={message.icon}
                width="50"
                height="50"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginLeft: "10px",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            >
              <div>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    color: "#053a3f",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {message.username}
                  <span
                    style={{
                      color: "#555",
                      fontWeight: "normal",
                      marginLeft: "10px",
                    }}
                  >
                    {moment(message.createdAt).fromNow()}
                  </span>
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    fontWeight: "bold",
                    backgroundColor: "#bcf4fc",
                    borderRadius: "15%",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ));
    } else if (option === 3) {
      return foromessageshobbies
        ?.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
        .map((message) => (
          <div key={message._id} style={{ display: "flex", margin: "10px" }}>
            <div>
              <Image
                src={message.icon}
                width="50"
                height="50"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginLeft: "10px",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            >
              <div>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    color: "#053a3f",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {message.username}
                  <span
                    style={{
                      color: "#555",
                      fontWeight: "normal",
                      marginLeft: "10px",
                    }}
                  >
                    {moment(message.createdAt).fromNow()}
                  </span>
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    margin: "0px",
                    fontWeight: "bold",
                    backgroundColor: "#bcf4fc",
                    borderRadius: "15%",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ));
    }
  };

  return (
    <MainScreen title="Foro">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="button"
          onClick={(e) => {
            setOption(0);
            setChatActual("General");
          }}
        >
          General
        </Button>
        <Button
          variant="primary"
          className="button"
          onClick={(e) => {
            setOption(1);
            setChatActual("de Vivencias");
          }}
        >
          Vivencias
        </Button>
        <Button
          variant="primary"
          className="button"
          onClick={(e) => {
            setOption(2);
            setChatActual("de Salud");
          }}
        >
          Salud
        </Button>
        <Button
          variant="primary"
          className="button"
          onClick={(e) => {
            setOption(3);
            setChatActual("de Hobbies");
          }}
        >
          Hobbies
        </Button>
      </div>
      {errorGeneral || errorSalud || errorVivencias || errorHobbies ? (
        <ErrorMessage variant="danger">
          {
            "Hubo un fallo al cargar los mensajes del chat. Por favor recargue la página"
          }
        </ErrorMessage>
      ) : (
        <div className="subtitle-centered-text-blue">Chat {chatActual}</div>
      )}
      <div className="foro_main_window">
        <div className="chat">
          {(loadingGeneral ||
            loadingSalud ||
            loadingHobbies ||
            loadingVivencias) && <Loading />}
          {forodisplay()}
        </div>
      </div>

      <Media query={{ maxWidth: 800 }}>
        {(matches) =>
          matches ? (
            <>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Escriba aqui"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={content}
                  rows={2}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
              </InputGroup>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  id="button-addon2"
                  className="button"
                  onClick={submitHandler}
                >
                  Enviar
                </Button>
                <Button
                  id="button-addon2"
                  className="button"
                  onClick={submitHandlerAnon}
                >
                  Enviar Anónimo
                </Button>
              </div>
            </>
          ) : (
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Escriba aqui"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={content}
                rows={2}
                onChange={(e) => setContent(e.target.value)}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  id="button-addon2"
                  className="button"
                  onClick={submitHandler}
                >
                  Enviar
                </Button>
                <Button
                  id="button-addon2"
                  className="button"
                  onClick={submitHandlerAnon}
                >
                  Enviar Anónimo
                </Button>
              </div>
            </InputGroup>
          )
        }
      </Media>
    </MainScreen>
  );
};

export default ForoPage;
