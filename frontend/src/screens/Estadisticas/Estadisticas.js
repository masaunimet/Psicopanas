import React, { useEffect } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";

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

  const emotion = ()=>{

    const pond = (5*datum[0])+ (4*datum[1])+ (3*datum[2])+ (2*datum[3])+ (1*datum[4]);

    const sum = datum[0]+ datum[1]+ datum[2]+ datum[3]+ datum[4];

    const promedio = Math.round(pond/sum);

    if(promedio===5) return "Muy Bien";
    else if(promedio===4) return "Bien";
    else if(promedio===3) return "Normal";
    else if(promedio===2) return "Mal";
    else if(promedio===1) return "Muy Mal";

  };

  return (
    <MainScreen title="Estadisticas">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div style={{ margin: "80px" }}>
        {datum ? (
          <>
          <div style={{display:"flex",justifyContent:"center"}}><h3>Emocion promedio: {emotion()}</h3></div>
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
            style={{ border: "none", fontSize: "15px" }}
          >Volver a mi diario</Button>
        </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </MainScreen>
  );
};

export default Estadisticas;
