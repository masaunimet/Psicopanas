import React, { useEffect } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getStats, getTagStats } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Estadisticas = ({ history }) => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats);
  const { loading, error, data: datum } = stats;
  // const tagStags = useSelector((state) => state.tagStags);
  const tagStags = JSON.parse(localStorage.getItem("statsTags"));
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const diaryAuth = useSelector((state) => state.diaryAuth);
  const { successDiary } = diaryAuth;

  useEffect(() => {
    dispatch(getStats());
    if (!userInfo) {
      history.push("/");
    } else if (
      (successDiary === false || !successDiary) &&
      userInfo.diarySecurity === true
    ) {
      history.push("/authDiario");
    }
  }, [dispatch, history, userInfo, successDiary]);

  useEffect(() => {
    dispatch(getTagStats());
  }, [dispatch]);

  let jsonData = null;
  if (datum !== undefined) {
    jsonData = {
      labels: ["Muy bien", "Bien", "Normal", "Mal", "Muy mal"],
      datasets: [
        {
          label: "Numero de entradas",
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

  return (
    <MainScreen title="Estadísticas de ánimo">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div>
        {datum ? (
          <>
            <Container>
              <Row>
                {userInfo?.isPremium ? (
                  <Col>
                    <Row>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h3 style={{ color: "#AB2975", fontWeight: "bold" }}>
                          Mis actividades
                        </h3>
                      </div>
                    </Row>
                    {tagStags ? (
                      <>
                        <Row>
                          <Col>
                            <div
                              style={{
                                color: "#0a656b",
                                fontWeight: "bold",
                                fontSize: "18px",
                              }}
                            >
                              Nombre de la actividad
                            </div>
                          </Col>
                          <Col>
                            <div
                              style={{
                                color: "#0a656b",
                                fontWeight: "bold",
                                fontSize: "18px",
                              }}
                            >
                              Cantidad de veces realizada
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
                            <Row>
                              <Col>
                                <div>{ptag.name}</div>
                              </Col>
                              <Col>
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
                ;
                <Col>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>Emoción promedio: {emotion()}</h3>
                  </div>
                  <EstadisticaColumna
                    chartData={jsonData}
                    style={{
                      padding: "0",
                      margin: "0",
                    }}
                  />
                  <Link to="/diario">
                    <Button
                      variant="secondary"
                      style={{
                        border: "none",
                        fontSize: "15px",
                        margin: "10px",
                      }}
                    >
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
