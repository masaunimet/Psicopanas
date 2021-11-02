import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEntryAction } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { listTags } from "../../actions/tagActions";
import { listEmotions } from "../../actions/emotionAction";
import "../createEntryPage/createEntryPage.css";
import { Link } from "react-router-dom";
import moment from "moment";

let setEmotion = "";

function CreateEntryPage({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [mitad] = useState([]);
  const [mitad2] = useState([]);

  const dispatch = useDispatch();

  const entryCreate = useSelector((state) => state.entryCreate);
  const { loading, error } = entryCreate;

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  // const last = useSelector((state) => state.lastEntry);
  // const { lastOne, loading: loadingLast } = last;

  const tagList = useSelector((state) => state.tagList);
  const loading2 = tagList.loading;
  const { tags } = tagList;

  const emotionList = useSelector((state) => state.emotionList);
  const loading3 = emotionList.loading;
  const { emotions } = emotionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const today = new Date();
  const diaryAuth = useSelector((state) => state.diaryAuth);
  const { successDiary } = diaryAuth;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }

    const mitads = userInfo?.personalTags.slice(0, 5);
    const mitads2 = userInfo?.personalTags.slice(5, 10);

    mitads.map((element) => mitad.push(element));
    mitads2.map((element) => mitad2.push(element));

    if (
      (successDiary === false || !successDiary) &&
      userInfo?.diarySecurity === true
    ) {
      history.push("/authDiario");
    }
  }, [history, successDiary, userInfo]);

  // useEffect(() => {
  //   dispatch(lastEntry());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(listEmotions());
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    dispatch(listTags());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    const entryTags = [];

    tags?.forEach((tag) => {
      if (document.getElementById(tag._id)?.checked === true) {
        entryTags.push(tag.name);
      }
    });
    userInfo.personalTags?.forEach((ptag) => {
      if (document.getElementById(ptag)?.checked === true) {
        entryTags.push(ptag);
      }
    });

    if (
      isEmpty(title.trim()) ||
      isEmpty(content.trim()) ||
      isEmpty(setEmotion)
    ) {
      visualButtons2();
      return alert(
        "Por favor, llena todos los datos e indica cómo te sientes hoy"
      );
    }
    dispatch(
      createEntryAction(title.trim(), content.trim(), entryTags, setEmotion)
    );

    if (
      setEmotion ===
      "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
    ) {
      history.push("/mensaje-racha");
    } 
    else if (
      setEmotion ===
      "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
    )
    {
      history.push("/mensaje-triste");
    }
    else if (
      setEmotion ===
      "https://res.cloudinary.com/psicopanas/image/upload/v1634436672/iconTooBad_cdqh4z.png"
    )
    {
      history.push("/mensaje-positivo");
    }
    else{

      history.push("/mensaje-feliz");
    }
    resetHandler();
  };

  function isEmpty(str) {
    return !str || 0 === str.length;
  }

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

  return (
    <>
      <MainScreen title={moment(today).format("YYYY-DD-MM")}>
        <Card
          style={{
            background: "none",
            border: "none",
          }}
        >
          <Card.Body>
            <Form onSubmit={submitHandler}>
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
                          setEmotion = emotion.icon;
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
                {loading2 && <Loading size={25} />}
                <Container>
                  <Row>
                    <Col>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            marginRight: "20px",
                            marginLeft: "40px",
                            color: "#AB2975",
                            fontWeight: "bold",
                          }}
                        >
                          Deberes
                        </p>
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
                              <Form.Check.Input type="checkbox" isValid />
                              <Form.Check.Label
                                style={{
                                  color: "#2F2F2F",
                                }}
                              >
                                {tag.name}
                              </Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                    </Col>
                    <Col>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            marginRight: "20px",
                            marginLeft: "40px",
                            color: "#AB2975",
                            fontWeight: "bold",
                          }}
                        >
                          Hobbies
                        </p>
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
                              <Form.Check.Input type="checkbox" isValid />
                              <Form.Check.Label
                                style={{
                                  color: "#2F2F2F",
                                }}
                              >
                                {tag.name}
                              </Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                    </Col>
                    <Col>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            marginRight: "20px",
                            marginLeft: "40px",
                            color: "#AB2975",
                            fontWeight: "bold",
                          }}
                        >
                          Emociones
                        </p>
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
                              <Form.Check.Input type="checkbox" isValid />
                              <Form.Check.Label
                                style={{
                                  color: "#2F2F2F",
                                }}
                              >
                                {tag.name}
                              </Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                    </Col>
                    <Col>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            marginRight: "20px",
                            marginLeft: "40px",
                            color: "#AB2975",
                            fontWeight: "bold",
                          }}
                        >
                          Social
                        </p>
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
                              <Form.Check.Input type="checkbox" isValid />
                              <Form.Check.Label
                                style={{
                                  color: "#2F2F2F",
                                }}
                              >
                                {tag.name}
                              </Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                    </Col>
                    <Col>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            color: "#AB2975",
                            fontWeight: "bold",
                            display: "flex",
                          }}
                        >
                          Mis actividades
                        </p>
                      </div>
                      {mitad.map((ptag) => (
                        <div>
                          <Form.Check
                            type="checkbox"
                            id={ptag}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <Form.Check.Input type="checkbox" isValid />
                            <Form.Check.Label style={{ color: "#2F2F2F" }}>
                              {ptag}
                            </Form.Check.Label>
                          </Form.Check>
                        </div>
                      ))}
                    </Col>
                    {userInfo?.isPremium ? (
                      <Col>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              color: "#AB2975",
                              fontWeight: "bold",
                              display: "flex",
                            }}
                          >
                            Premium
                          </p>
                        </div>
                        {mitad2.map((ptag) => (
                          <div>
                            <Form.Check
                              type="checkbox"
                              id={ptag._id}
                              style={{ margin: "5px", cursor: "pointer" }}
                            >
                              <Form.Check.Input type="checkbox" isValid />
                              <Form.Check.Label
                                style={{
                                  color: "#2F2F2F",
                                }}
                              >
                                {ptag.name}
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

              <Link to="/authDiario">
                <Button
                  variant="secondary"
                  className="buttonSummit"
                  style={{ border: "none", marginRight: "10px" }}
                >
                  Volver al diario
                </Button>
              </Link>

              <Button
                type="submit"
                variant="primary"
                className="buttonSummit"
                style={{ border: "none" }}
              >
                Guardar entrada
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </MainScreen>
    </>
  );
}

export default CreateEntryPage;
