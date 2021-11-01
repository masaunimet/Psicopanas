import React, { useEffect } from "react";
import { Accordion, Button, Card, Container, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { listEntries } from "../../actions/entryActions";
import { listTags } from "../../actions/tagActions";
import { listEmotions } from "../../actions/emotionAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Diario = ({ history }) => {
  const dispatch = useDispatch();

  const entryList = useSelector((state) => state.entryList);
  const { loading, error, entries } = entryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const entryCreate = useSelector((state) => state.entryCreate);
  const { success: successCreate } = entryCreate;

  const entryUpdate = useSelector((state) => state.entryUpdate);
  const { success: successUpdate } = entryUpdate;

  // const last = useSelector((state) => state.lastEntry);
  // const { lastOne } = last;

  const diaryAuth = useSelector((state) => state.diaryAuth);
  const { successDiary } = diaryAuth;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin === true) {
        history.push("/admin");
      } else if (
        (successDiary === false || !successDiary) &&
        userInfo.diarySecurity === true
      ) {
        history.push("/authDiario");
      }
    }
  });

  useEffect(() => {
    dispatch(listEntries());
  }, [dispatch, history, userInfo, successCreate, successUpdate]);

  useEffect(() => {
    dispatch(listTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listEmotions());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(lastEntry());
  // }, [dispatch]);

  // useEffect(() => {}, [lastOne]);

  return (
    <MainScreen title="Diario">
      <h2 style={{}}>Bienvenido de vuelta {userInfo.name}</h2>
      <div style={{ display: "flex" }}>
        <Link to="/crearEntrada">
          <Button
            size="md"
            variant="primary"
            style={{ marginRight: "10px", border: "none" }}
          >
            Crear entrada
          </Button>
        </Link>
        <Link to="/estadisticas">
          <Button
            size="md"
            variant="primary"
            style={{ marginRight: "10px", border: "none" }}
          >
            Ver estadísticas
          </Button>
        </Link>
        <Link to="/ajustes-diario">
          <Button
            size="md"
            variant="secondary"
            style={{ marginRight: "10px", border: "none" }}
          >
            Ajustes
          </Button>
        </Link>
      </div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {entries
        ?.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return -1;
          }
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          return 0;
        })
        .map((entry) => (
          <Accordion key={entry._id}>
            <Card
              style={{
                margin: 10,
                borderColor: "#11CBD6",
                background: "#f6f6f6",
                borderRadius: "10px",
              }}
            >
              <Card.Header style={{ display: "flex" }}>
                <img src={entry.emotion} width="50" height="50" alt="" />
                <Accordion.Toggle
                  style={{
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                  as={Card.Text}
                  variant="link"
                  eventKey="0"
                >
                  <div
                    style={{
                      marginLeft: "10px",
                      color: "#797979",
                      fontWeight: "bold",
                    }}
                  >
                    {moment(entry.createdAt).format("YYYY-DD-MM")}{" "}
                  </div>
                </Accordion.Toggle>
                <div
                  style={{
                    color: "#AB2975",
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {entry.title}
                </div>
                <div>
                  <Button
                    href={`/diario/${entry._id}`}
                    style={{
                      background: "#f6f6f6",
                      padding: "0",
                      margin: "0",
                      border: "none",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/psicopanas/image/upload/v1634441688/iconPencil_zngxxh.png"
                      width="20px"
                      height="20px"
                      alt="Editar"
                    />
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Container>
                    <Row>
                      <Col style={{ width: "auto" }}>
                        {entry.tags?.map((tag) => (
                          <div
                            style={{
                              color: "#0a656b",
                              background: "#bcf4fc",
                              fontWeight: "bold",
                              margin: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "2px",
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </Col>
                      <Col>
                        <blockquote className="blockquote mb-0">
                          <div
                            style={{
                              color: "#171717",
                              marginTop: "10px",
                              textAlign: "justify",
                              fontSize: "15px",
                            }}
                          >
                            {entry.content}
                          </div>
                        </blockquote>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))
        .reverse()}
    </MainScreen>
  );
};

export default Diario;
