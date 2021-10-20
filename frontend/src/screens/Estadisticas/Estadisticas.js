import React, { useEffect } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";

import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Estadisticas = ({ history }) => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats);
  const { loading, error, data: datum } = stats;
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
    const max = datum[0] + datum[1] + datum[2] + datum[3] + datum[4];

    const tempMB = datum[0] / max;
    console.log(tempMB);
    const tempB = datum[1] / max;
    const tempN = datum[2] / max;
    const tempM = datum[3] / max;
    const tempMM = datum[4] / max;

    const temp = Math.max(tempMB, tempB, tempN, tempM, tempMM);

    if (temp === tempMB) return "Muy Bien";
    else if (temp === tempB) return "Bien";
    else if (temp === tempN) return "Normal";
    else if (temp === tempM) return "Mal";
    else if (temp === tempMM) return "Muy Mal";
  };

  return (
    <MainScreen title="Estadisticas">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div style={{ margin: "80px" }}>
        {datum ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>Emocion promedio: {emotion()}</h3>
            </div>
            <EstadisticaColumna
              chartData={jsonData}
              style={{
                padding: "0",
                margin: "0",
              }}
            />
          </>
        ) : (
          <div></div>
        )}
      </div>
    </MainScreen>
  );
};

export default Estadisticas;
