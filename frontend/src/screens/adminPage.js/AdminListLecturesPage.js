import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getNonPublicatedLecturesAction,
  getPublicatedLecturesAction,
} from "../../actions/lectureActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/mainscreen/MainScreen";
import moment from "moment";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de ver todas las lecturas del Admin
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const AdminListLecturesPage = ({ history }) => {
  const dispatch = useDispatch();

  const getPublicatedLectures = useSelector(
    (state) => state.getPublicatedLectures
  );
  const {
    loading: loadingPublicated,
    error: errorPublicated,
    publicatedLecturesInfo,
  } = getPublicatedLectures;
  const getNonPublicatedLectures = useSelector(
    (state) => state.getNonPublicatedLectures
  );
  const {
    loading: loadingNonPublicated,
    error: errorNonPublicated,
    nonPublicatedLecturesInfo,
  } = getNonPublicatedLectures;

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

  //trae la informacion de getPublicatedLecturesAction a redux
  useEffect(() => {
    dispatch(getPublicatedLecturesAction());
  }, [dispatch]);

  //trae la informacion de getNonPublicatedLecturesAction a redux
  useEffect(() => {
    dispatch(getNonPublicatedLecturesAction());
  }, [dispatch]);

  return (
    <MainScreen title="Lecturas">
      <Container className="container-no-bg">
        <Row>
          <Col md={6}>
            <Row>
              <div className="subtitle-text-blue">
                Lista de Lecturas No Publicadas
              </div>
            </Row>
            {errorNonPublicated && (
              <ErrorMessage variant="danger">
                {"Ocurrió un error al cargar. Por favor refresque la página"}
              </ErrorMessage>
            )}
            {loadingNonPublicated && <Loading size={100} />}
            {nonPublicatedLecturesInfo
              ?.sort((a, b) => {
                if (a.publicationDate < b.publicationDate) {
                  return -1;
                }
                if (a.publicationDate > b.publicationDate) {
                  return 1;
                }
                return 0;
              })
              .map((lecture) => (
                <Row className="div-admin-page">
                  <Col className="plain-text">{lecture.title.slice(0, 15)}</Col>
                  <Col className="plain-text">
                    {moment(lecture.publicationDate).format("ll")}
                  </Col>
                  <Col>
                    <Button
                      className="button-all-page"
                      href={`/admin-editar-lectura/${lecture._id}`}
                    >
                      Editar
                    </Button>
                  </Col>
                </Row>
              ))}
          </Col>
          <Col md={6}>
            <Row>
              <div className="subtitle-text-blue">
                Lista de Lecturas Publicadas
              </div>
            </Row>
            {errorPublicated && (
              <ErrorMessage variant="danger">
                {"Ocurrió un error al cargar. Por favor refresque la página"}
              </ErrorMessage>
            )}
            {loadingPublicated && <Loading size={100} />}
            {publicatedLecturesInfo
              ?.sort((a, b) => {
                if (a.publicationDate > b.publicationDate) {
                  return -1;
                }
                if (a.publicationDate < b.publicationDate) {
                  return 1;
                }
                return 0;
              })
              .map((lecture) => (
                <Row className="div-admin-page">
                  <Col className="plain-text">{lecture.title.slice(0, 15)}</Col>
                  <Col className="plain-text">
                    {moment(lecture.publicationDate).format("ll")}
                  </Col>
                  <Col>
                    <Button
                      className="button-all-page"
                      href={`/admin-editar-lectura/${lecture._id}`}
                    >
                      Editar
                    </Button>
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default AdminListLecturesPage;
