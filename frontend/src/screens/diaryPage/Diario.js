import React, { useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listEntries } from "../../actions/entryActions";
import { listEmotions } from "../../actions/emotionAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

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

  useEffect(() => {
    dispatch(listEntries());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successCreate, successUpdate]);

  return (
    <MainScreen title="Diario">
      <Link to="/crearEntrada">
        <Button size="md">Crear Entrada</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {entries?.map((entry) => (
        <Accordion key={entry._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <Accordion.Toggle
                style={{
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
                as={Card.Text}
                variant="link"
                eventKey="0"
              >
                {entry.title}
              </Accordion.Toggle>
              <div>
                <Button href={`/diario/${entry._id}`}>Editar</Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{entry.content}</p>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default Diario;
