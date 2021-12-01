import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getStats,
  getTagStats,
  getMonthStats,
} from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../../styles/App.css";

/**
  * @desc Es la funcion encargada de traer funcionar la pagina
  * de estadisticas
  * @param history variable encargada de redireccionar a otras paginas o URL's
*/
const Estadisticas = ({ history }) => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats);
  const { loading, error, data: datum } = stats;
  const monthStats = useSelector((state) => state.monthStats);
  const { data: datumMonth } = monthStats;
  const tagStags = JSON.parse(localStorage.getItem("statsTags"));
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const diaryAuth = useSelector((state) => state.diaryAuth);
  const { successDiary } = diaryAuth;

  const [showTop, setShowTop] = useState(false);

  //encargada de redireccionar a otra pagina si no tiene los requisitos necesarios
  useEffect(() => {
    dispatch(getStats());
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
  }, [dispatch, history, userInfo, successDiary]);

  //trae la informacion de getTagStats a redux
  useEffect(() => {
    dispatch(getTagStats());
  }, [dispatch]);

  //trae la informacion de getMonthStats a redux
  useEffect(() => {
    dispatch(getMonthStats());
  }, [dispatch]);

  let jsonData = null;
  if (datum !== undefined) {
    jsonData = {
      labels: ["Muy bien", "Bien", "Normal", "Mal", "Muy mal"],
      datasets: [
        {
          label: "Número de entradas por emoción",
          data: [datum[0], datum[1], datum[2], datum[3], datum[4]],
          backgroundColor: [
            "#90d4de",
            "#90d4de",
            "#90d4de",
            "#90d4de",
            "#90d4de",
          ],
        },
      ],
    };
  }

  //se encarga de tener informacion placheholder mientras carga la info del backend
  let jsonData2 = null;
  if (datumMonth !== undefined) {
    jsonData2 = {
      labels: ["Muy bien", "Bien", "Normal", "Mal", "Muy mal"],
      datasets: [
        {
          label: "Número de entradas por emoción",
          data: [
            datumMonth[0],
            datumMonth[1],
            datumMonth[2],
            datumMonth[3],
            datumMonth[4],
          ],
          backgroundColor: [
            "#90d4de",
            "#90d4de",
            "#90d4de",
            "#90d4de",
            "#90d4de",
          ],
        },
      ],
    };
  }

  /**
  * @desc La funcion se encarga de agarrar la informacion de las estadisticas para
  * sacar un valor promedio
  */
  const emotion = () => {
    const pond =
      5 * datum[0] + 4 * datum[1] + 3 * datum[2] + 2 * datum[3] + 1 * datum[4];

    const sum = datum[0] + datum[1] + datum[2] + datum[3] + datum[4];

    const promedio = Math.round(pond / sum);

    if (promedio === 5) return "Muy Bien";
    else if (promedio === 4) return "Bien";
    else if (promedio === 3) return "Normal";
    else if (promedio === 2) return "Mal";
    else if (promedio === 1) return "Muy Mal";
  };

  /**
  * @desc La funcion se encarga de agarrar la informacion de las estadisticas para
  * sacar un valor promedio
  */
  const emotion2 = () => {
    const pond2 =
      5 * datumMonth[0] +
      4 * datumMonth[1] +
      3 * datumMonth[2] +
      2 * datumMonth[3] +
      1 * datumMonth[4];

    const sum2 =
      datumMonth[0] +
      datumMonth[1] +
      datumMonth[2] +
      datumMonth[3] +
      datumMonth[4];

    const promedio2 = Math.round(pond2 / sum2);

    if (promedio2 === 5) return "Muy Bien";
    else if (promedio2 === 4) return "Bien";
    else if (promedio2 === 3) return "Normal";
    else if (promedio2 === 2) return "Mal";
    else if (promedio2 === 1) return "Muy Mal";
  };

  return (
    <MainScreen title="Estadísticas de ánimo">
      {error && (
        <ErrorMessage variant="danger">
          {
            "Ocurrió un error al cargar las estadísticas. Por favor recargue la página"
          }
        </ErrorMessage>
      )}
      {loading && <Loading />}
      <div>
        {datum ? (
          <>
            <Container className="white-background">
              <Row>
                <Col md={3} className="blue-background">
                  <Link to="/diario">
                    <Button
                      variant="primary"
                      className="button-all-page"
                      style={{ marginTop: "10px" }}
                    >
                      Volver a mi diario
                    </Button>
                  </Link>
                  {userInfo?.isPremium && !showTop ? (
                    <div md="auto" className="blue-background">
                      <Button
                        onClick={(e) => {
                          setShowTop(true);
                        }}
                        className="button-all-page"
                        style={{ marginTop: "10px" }}
                      >
                        Mostrar más
                      </Button>
                      <Row
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="subtitle-centered-text-white">
                          Top 10 de Actividades
                        </div>
                      </Row>
                      {tagStags ? (
                        <>
                          <Row>
                            <Col>
                              <div className="subtitle-text-soft-white-right">
                                Nombre
                              </div>
                            </Col>
                            <Col>
                              <div className="subtitle-text-soft-white">
                                Veces realizada
                              </div>
                            </Col>
                          </Row>
                          {tagStags
                            .sort((a, b) => {
                              if (a.value > b.value) {
                                return -1;
                              }
                              if (a.value < b.value) {
                                return 1;
                              }
                              return 0;
                            })
                            .slice(0, 9)
                            .map((ptag) => (
                              <Row style={{ borderTop: "solid 1px #f6f6f6" }}>
                                <Col className="plain-white-text-right">
                                  <div>{ptag.name}</div>
                                </Col>
                                <Col className="plain-white-text">
                                  <div>{ptag.value} veces</div>
                                </Col>
                              </Row>
                            ))}
                        </>
                      ) : (
                        <Loading />
                      )}
                    </div>
                  ) : (
                    <div md="auto" className="blue-background">
                      <Button
                        onClick={(e) => {
                          setShowTop(false);
                        }}
                        className="button-all-page"
                        style={{ marginTop: "10px" }}
                      >
                        Mostrar menos
                      </Button>
                      <Row
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="subtitle-centered-text-white">
                          Todas las Actividades
                        </div>
                      </Row>
                      {tagStags ? (
                        <>
                          <Row>
                            <Col>
                              <div className="subtitle-text-soft-white-right">
                                Nombre
                              </div>
                            </Col>
                            <Col>
                              <div className="subtitle-text-soft-white">
                                Veces realizada
                              </div>
                            </Col>
                          </Row>
                          {tagStags
                            .sort((a, b) => {
                              if (a.value > b.value) {
                                return -1;
                              }
                              if (a.value < b.value) {
                                return 1;
                              }
                              return 0;
                            })
                            .map((ptag) => (
                              <Row style={{ borderTop: "solid 1px #f6f6f6" }}>
                                <Col className="plain-white-text-right">
                                  <div>{ptag.name}</div>
                                </Col>
                                <Col className="plain-white-text">
                                  <div>{ptag.value} veces</div>
                                </Col>
                              </Row>
                            ))}
                        </>
                      ) : (
                        <Loading />
                      )}
                    </div>
                  )}
                </Col>
                <Col>
                  {userInfo?.isPremium === true && datumMonth !== undefined ? (
                    <>
                      <div className="subtitle-centered-text-blue">
                        Estadísticas del Mes
                      </div>
                      <div className="subtitle-centered-text-soft-blue">
                        Emoción promedio: {emotion2()}
                      </div>
                      <EstadisticaColumna
                        chartData={jsonData2}
                        style={{
                          padding: "0",
                          margin: "0",
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="subtitle-centered-text-blue">
                    Estadísticas del Año
                  </div>
                  <div className="subtitle-centered-text-soft-blue">
                    Emoción promedio: {emotion()}
                  </div>
                  <EstadisticaColumna
                    chartData={jsonData}
                    style={{
                      padding: "0",
                      margin: "0",
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </MainScreen>
  );
};

export default Estadisticas;
