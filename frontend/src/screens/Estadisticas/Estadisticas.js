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
  const { loading, error, data } = stats;

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  let jsonData = {
    labels: ["Muy Feliz", "Feliz", "Normal", "Triste", "Muy Triste"],
    datasets: [
      {
        label: "Numero de entradas",
        data: [
          stats.muyBien,
          stats.bien,
          stats.normal,
          stats.mal,
          stats.muyMal,
        ],
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

  return (
    <MainScreen title="Estadisticas">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {stats ? <EstadisticaColumna chartData={jsonData} /> : <div>Hola</div>}
    </MainScreen>
  );
};

export default Estadisticas;
