import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateEntryAction } from "../../actions/entryActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import moment from "moment";
import { listTags } from "../../actions/tagActions";
import { listEmotions } from "../../actions/emotionAction";

import { Link } from "react-router-dom";

function UpdateEntryPage({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState("");
  const [emotion, setEmotion] = useState("");

  const dispatch = useDispatch();

  const entryUpdate = useSelector((state) => state.entryUpdate);
  const { loading, error } = entryUpdate;

  const tagList = useSelector((state) => state.tagList);
  const loading2 = tagList.loading;
  const { tags } = tagList;

  const emotionList = useSelector((state) => state.emotionList);
  const loading3 = emotionList.loading;
  const { emotions } = emotionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const diaryAuth = useSelector((state) => state.diaryAuth);
  const { successDiary } = diaryAuth;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (
        (successDiary === false || !successDiary) &&
        userInfo.diarySecurity === true
      ) {
        history.push("/authDiario");
      }
    }
  }, [history, userInfo, successDiary]);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/entries/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setDate(data.createdAt);
      setEmotion(data.emotion);
    };
    fetching();
  }, [match.params.id]);

  useEffect(() => {
    dispatch(listEmotions());
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    dispatch(listTags());
  }, [dispatch]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const entryTags = [];

    tags?.forEach((tag) => {
      if (document.getElementById(tag._id).checked === true) {
        entryTags.push(tag.name);
      }
    });
    userInfo.personalTags?.forEach((ptag) => {
      if (document.getElementById(ptag).checked === true) {
        entryTags.push(ptag);
      }
    });

    if (
      isEmpty(title?.trim()) ||
      isEmpty(content?.trim()) ||
      isEmpty(emotion)
    ) {
      visualButtons2();
      return alert(
        "Por favor, llena todos los datos e indica cómo te sientes hoy"
      );
    }

    dispatch(
      updateEntryAction(match.params.id, title, content, entryTags, emotion)
    );

    if (
      emotion ===
      "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
    ) {
      history.push("/mensaje-racha");
    } else {
      history.push("/diario");
    }

    resetHandler();
  };

  const visualButtons = (id) => {
    emotions?.forEach((emotion) => {
      if (emotion._id !== id) {
        document.getElementById(emotion._id)?.setAttribute("width", "50");
        document.getElementById(emotion._id)?.setAttribute("height", "50");
      } else {
        document.getElementById(emotion._id)?.setAttribute("width", "80");
        document.getElementById(emotion._id)?.setAttribute("height", "80");
      }
    });
  };

  const visualButtons2 = () => {
    emotions?.forEach((emotion) => {
      document.getElementById(emotion._id)?.setAttribute("width", "50");
      document.getElementById(emotion._id)?.setAttribute("height", "50");
    });
  };

  function isEmpty(str) {
    return !str || 0 === str.length;
  }

  return (
    <MainScreen title={moment(date).format("YYYY-DD-MM")}>
      <Card
        style={{
          background: "none",
          border: "none",
        }}
      >
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Ponle un título a tu día
              </Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                ¿Cómo te sientes hoy?
              </Form.Label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {loading3 && <Loading size={25} />}
                  {emotions?.map((emotion) => (
                    <div
                      onClick={(e) => {
                        visualButtons(emotion._id);
                        setEmotion(emotion.icon);
                      }}
                    >
                      <img
                        id={emotion._id}
                        src={emotion.icon}
                        width="50"
                        height="50"
                        alt={emotion.name}
                      />
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {emotion.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="tag">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                ¿Qué te hizo sentir así?
              </Form.Label>
              <div style={{ display: "flex" }}>
                {loading2 && <Loading size={25} />}
                {tags?.map((tag) => (
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={tag._id}
                      style={{ marginLeft: "15px", marginTop: "5px" }}
                    >
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label
                        style={{ color: "#171717", fontSize: "15px" }}
                      >
                        {tag.name}
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      marginRight: "20px",
                      marginLeft: "40px",
                      color: "#AB2975",
                      fontWeight: "bold",
                    }}
                  >
                    Actividades Personalizadas
                    <Link to="/ajustes-diario">
                      <Button
                        variant="secondary"
                        style={{
                          border: "none",
                          marginLeft: "10px",
                        }}
                      >
                        Editar
                      </Button>
                    </Link>
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  {userInfo?.personalTags?.map((ptag) => (
                    <div className="mb-3" style={{ marginRight: "10px" }}>
                      <Form.Check
                        type="checkbox"
                        id={ptag}
                        style={{ marginLeft: "15px", marginTop: "5px" }}
                      >
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label
                          style={{ color: "#2F2F2F", fontSize: "15px" }}
                        >
                          {ptag}
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Cuéntanos mas sobre tu día
              </Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}

            <Button
              type="submit"
              variant="secondary"
              className="buttonSummit"
              style={{ border: "none", marginRight: "10px" }}
            >
              Volver al diario
            </Button>

            <Button
              type="submit"
              variant="primary"
              className="buttonSummit"
              style={{ border: "none" }}
            >
              Guardar cambios
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default UpdateEntryPage;
