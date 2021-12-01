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

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * principal del diario, donde puedes ver y editar entradas del diario
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
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

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
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

  //trae la informacion de listEntries a redux
  useEffect(() => {
    dispatch(listEntries());
  }, [dispatch, history, userInfo, successCreate, successUpdate]);

  //trae la informacion de listTags a redux
  useEffect(() => {
    dispatch(listTags());
  }, [dispatch]);

  //trae la informacion de listEmotions a redux
  useEffect(() => {
    dispatch(listEmotions());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(lastEntry());
  // }, [dispatch]);

  // useEffect(() => {}, [lastOne]);

  return (
    <MainScreen title="Diario">
      <div className="subtitle-text-blue">Bienvenido {userInfo.name}</div>
      <Row>
        <Col>
          <Link to="/crearEntrada">
            <Button
              variant="secondary"
              className="button-all-page"
              style={{ marginLeft: "10px" }}
            >
              Crear entrada
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="/estadisticas">
            <Button variant="primary" className="button-all-page">
              Ver estadísticas
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="/ajustes-diario">
            <Button
              variant="primary"
              className="button-all-page"
              style={{ marginRight: "10px" }}
            >
              Ajustes de diario
            </Button>
          </Link>
        </Col>
      </Row>
      {error && (
        <ErrorMessage variant="danger">
          {"Ocurrió un error al cargar el diario. Por favor recargue la página"}
        </ErrorMessage>
      )}
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
            <Card className="container-entry">
              <Card.Header className="container-entry-header">
                <Accordion.Toggle
                  style={{
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                    display: "flex",
                  }}
                  as={Card.Text}
                  variant="link"
                  eventKey="0"
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <img src={entry.emotion} width="50" height="50" alt="" />
                    <div>
                      <div className="subtitle-text-gray">
                        {moment(entry.createdAt).format("LL")}
                      </div>
                      <div className="subtitle-text-pink">{entry.title}</div>
                    </div>
                  </div>
                </Accordion.Toggle>

                <div>
                  <Button href={`/diario/${entry._id}`} className="edit-button">
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
                  <Container style={{ margin: 0, padding: 0 }}>
                    <Row>
                      <Col style={{ width: "auto" }}>
                        {entry.tags?.map((tag) => (
                          <div className="container-entry-tag">{tag}</div>
                        ))}
                      </Col>
                      <Col>
                        <div>
                          <div className="plain-text">{entry.content}</div>
                        </div>
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
