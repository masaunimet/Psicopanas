import React, { useEffect } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";

import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Estadisticas = () => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats);
  const { loading, error, data: datum } = stats;

  console.log(datum);

  useEffect(() => {
    dispatch(getStats());
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
            "rgba(255,0,0,0.6)",
            "rgba(0,255,0,0.6)",
            "rgba(0,0,255,0.6)",
            "rgba(255,255,0,0.6)",
            "rgba(0,255,255,0.6)",
          ],
        },
      ],
    };
  }

  return (
    <MainScreen title="Estadisticas">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div style={{ margin: "80px" }}>
        {datum ? (
          <EstadisticaColumna
            chartData={jsonData}
            style={{
              padding: "0",
              margin: "0",
            }}
          />
        ) : (
          <div></div>
        )}
      </div>
    </MainScreen>
  );
};

export default Estadisticas;
