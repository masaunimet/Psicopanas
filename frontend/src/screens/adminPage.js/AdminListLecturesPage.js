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

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo?.isAdmin === false) {
        history.push("/");
      }
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    dispatch(getPublicatedLecturesAction());
  }, [dispatch]);

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
              <ErrorMessage variant="danger">{errorNonPublicated}</ErrorMessage>
            )}
            {loadingNonPublicated && <Loading size={25} />}
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
                    {moment(lecture.publicationDate).format("LL")}
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
              <ErrorMessage variant="danger">{errorPublicated}</ErrorMessage>
            )}
            {loadingPublicated && <Loading size={25} />}
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
                    {moment(lecture.publicationDate).format("LL")}
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
