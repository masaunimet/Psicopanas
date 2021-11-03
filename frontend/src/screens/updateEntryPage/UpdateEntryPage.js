import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import axios from "axios";
import { Button, Card, Row, Container, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateEntryAction } from "../../actions/entryActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import moment from "moment";
import { listTags } from "../../actions/tagActions";
import { listEmotions } from "../../actions/emotionAction";
import { Link } from "react-router-dom";
import "../../styles/App.css";

function UpdateEntryPage({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState("");
  const [emotion, setEmotion] = useState("");

  const [mitad] = useState([]);
  const [mitad2] = useState([]);

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
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      }
    }

    const mitads = userInfo?.personalTags.slice(0, 5);
    const mitads2 = userInfo?.personalTags.slice(5, 10);

    mitads.map((element) => mitad.push(element));
    mitads2.map((element) => mitad2.push(element));
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

  const visualButtons = (id, icon) => {
    emotions?.forEach((emotion) => {
      if (emotion._id !== id) {
        document.getElementById(emotion._id)?.setAttribute("width", "50");
        document.getElementById(emotion._id)?.setAttribute("height", "50");
        if (emotion._id === "6169efd6152f0e9299ff6810") {
          document
            .getElementById(emotion._id)
            ?.setAttribute(
              "src",
              "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
            );
        } else if (emotion._id === "616b11348f059d3c912e9943") {
          document
            .getElementById(emotion._id)
            ?.setAttribute(
              "src",
              "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
            );
        } else if (emotion._id === "616b11858f059d3c912e9944") {
          document
            .getElementById(emotion._id)
            ?.setAttribute(
              "src",
              "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
            );
        } else if (emotion._id === "616b11b48f059d3c912e9945") {
          document
            .getElementById(emotion._id)
            ?.setAttribute(
              "src",
              "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
            );
        } else if (emotion._id === "616b11ec8f059d3c912e9946") {
          document
            .getElementById(emotion._id)
            ?.setAttribute(
              "src",
              "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
            );
        }
      } else {
        document.getElementById(emotion._id)?.setAttribute("width", "80");
        document.getElementById(emotion._id)?.setAttribute("height", "80");
        document.getElementById(emotion._id)?.setAttribute("src", icon);
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
      <Card className="no-background">
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label className="subtitle-text-blue">
                Ponle un título a tu entrada
              </Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="plain-text"
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label className="subtitle-text-blue">
                ¿Cómo te sientes?
              </Form.Label>
              <div className="box-emotions-container">
                <div className="box-emotions">
                  {loading3 && <Loading size={25} />}
                  {emotions?.map((emotion) => (
                    <div
                      onClick={(e) => {
                        visualButtons(emotion._id, emotion.icon);
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
                      <div className="centered-text">{emotion.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label className="subtitle-text-blue">
                ¿Qué te hizo sentir así?
              </Form.Label>
              {loading2 && <Loading size={25} />}
              <Container className="white-background">
                <Row>
                  <Col>
                    <div className="flex-container">
                      <p className="subtitle-text-soft-blue">Deberes</p>
                    </div>
                    {tags
                      ?.filter((tag) => tag.group === "Deberes")
                      .map((tag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={tag._id}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Label
                              style={{
                                color: "#2c2c2c",
                                fontWeight: "bold",
                              }}
                              className="checkbox"
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <span class="check">{tag.name}</span>
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                  </Col>
                  <Col>
                    <div className="flex-container">
                      <p className="subtitle-text-soft-blue">Hobbies</p>
                    </div>
                    {tags
                      ?.filter((tag) => tag.group === "Hobbies")
                      .map((tag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={tag._id}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Label
                              style={{
                                color: "#2c2c2c",
                                fontWeight: "bold",
                              }}
                              className="checkbox"
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <span class="check">{tag.name}</span>
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                  </Col>
                  <Col>
                    <div className="flex-container">
                      <p className="subtitle-text-soft-blue">Emociones</p>
                    </div>
                    {tags
                      ?.filter((tag) => tag.group === "Emociones")
                      .map((tag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={tag._id}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Label
                              style={{
                                color: "#2c2c2c",
                                fontWeight: "bold",
                              }}
                              className="checkbox"
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <span class="check">{tag.name}</span>
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                  </Col>
                  <Col>
                    <div className="flex-container">
                      <p className="subtitle-text-soft-blue">Social</p>
                    </div>
                    {tags
                      ?.filter((tag) => tag.group === "Social")
                      .map((tag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={tag._id}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Label
                              style={{
                                color: "#2c2c2c",
                                fontWeight: "bold",
                              }}
                              className="checkbox"
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <span class="check">{tag.name}</span>
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                  </Col>
                  <Col>
                    <div className="flex-container">
                      <p className="subtitle-text-soft-blue">Salud</p>
                    </div>
                    {tags
                      ?.filter((tag) => tag.group === "Salud")
                      .map((tag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={tag._id}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Label
                              style={{
                                color: "#2c2c2c",
                                fontWeight: "bold",
                              }}
                              className="checkbox"
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <span class="check">{tag.name}</span>
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                  </Col>
                  <Col>
                    <div className="flex-container">
                      <p className="subtitle-text-soft-blue">Personalizadas</p>
                    </div>
                    {mitad.map((ptag) => (
                      <div>
                        <Form.Check
                          type="checkbox"
                          id={ptag}
                          style={{ margin: "5px", cursor: "pointer" }}
                        >
                          <Form.Check.Label
                            style={{
                              color: "#2c2c2c",
                              fontWeight: "bold",
                            }}
                            className="checkbox"
                          >
                            <Form.Check.Input type="checkbox" isValid />
                            <span class="check">{ptag}</span>
                          </Form.Check.Label>
                        </Form.Check>
                      </div>
                    ))}
                  </Col>
                  {userInfo?.isPremium ? (
                    <Col>
                      <div className="flex-container">
                        <p className="subtitle-text-soft-blue">Premium</p>
                      </div>
                      {mitad2.map((ptag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={ptag}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Label
                              style={{
                                color: "#2c2c2c",
                                fontWeight: "bold",
                              }}
                              className="checkbox"
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <span class="check">{ptag}</span>
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                    </Col>
                  ) : (
                    <div></div>
                  )}
                </Row>
              </Container>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label className="subtitle-text-blue">
                Cuéntanos mas sobre eso
              </Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                rows={4}
                onChange={(e) => setContent(e.target.value)}
                className="plain-text"
              />
            </Form.Group>

            {loading && <Loading size={50} />}

            <Row>
              <Col>
                <Link to="/authDiario">
                  <Button variant="primary" className="button-all-page">
                    Volver al diario
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="primary"
                  className="button-all-page"
                >
                  Guardar cambios
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default UpdateEntryPage;
