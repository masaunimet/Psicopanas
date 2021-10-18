import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateEntryAction } from "../../actions/entryActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function UpdateEntryPage({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const entryUpdate = useSelector((state) => state.entryUpdate);
  const { loading, error } = entryUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/entries/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateEntryAction(match.params.id, title, content));
    if (!title || !content) return;

    resetHandler();
    history.push("/diario");
  };

  return (
    <MainScreen title="Editar entrada">
      <Card>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Ponle un nombre a tu día</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Cuentanos mas de tu día</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default UpdateEntryPage;
