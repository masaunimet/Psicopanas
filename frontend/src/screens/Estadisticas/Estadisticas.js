import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getTagStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMonthStats());
  }, [dispatch]);

  let jsonData = null;
  if (datum !== undefined) {
    jsonData = {
      labels: ["Muy bien", "Bien", "Normal", "Mal", "Muy mal"],
      datasets: [
        {
          label: "Numero de entradas por emoción",
          data: [datum[0], datum[1], datum[2], datum[3], datum[4]],
          backgroundColor: [
            "#11CBD6",
            "#0FA5AE",
            "#0a656b",
            "#053a3f",
            "#171717",
          ],
        },
      ],
    };
  }

  let jsonData2 = null;
  if (datumMonth !== undefined) {
    jsonData2 = {
      labels: ["Muy bien", "Bien", "Normal", "Mal", "Muy mal"],
      datasets: [
        {
          label: "Numero de entradas por emoción",
          data: [
            datumMonth[0],
            datumMonth[1],
            datumMonth[2],
            datumMonth[3],
            datumMonth[4],
          ],
          backgroundColor: [
            "#11CBD6",
            "#0FA5AE",
            "#0a656b",
            "#053a3f",
            "#171717",
          ],
        },
      ],
    };
  }

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
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div>
        {datum ? (
          <>
            <Container className="white-background">
              <Row>
                {userInfo?.isPremium ? (
                  <Col md="auto" className="blue-background">
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                      <div className="subtitle-centered-text-white">
                        Histórico de actividades
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
                  </Col>
                ) : (
                  <></>
                )}
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
                  <Link to="/diario">
                    <Button variant="secondary" className="button-all-page">
                      Volver a mi diario
                    </Button>
                  </Link>
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
