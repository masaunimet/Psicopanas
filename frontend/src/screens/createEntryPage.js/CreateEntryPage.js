import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEntryAction } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { listEmotions } from "../../actions/emotionAction";

function CreateEntryPage({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const entryCreate = useSelector((state) => state.entryCreate);
  const { loading, error, entry } = entryCreate;

  //console.log(entry);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  function SAS() {
    console.log("hola");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEntryAction(title, content));
    if (!title || !content) return;

    // emotions?.map((emotion) => {
    //   if (document.getElementById(emotion._id).isSelected === true) {
    //     console.log(emotion.name);
    //   } else {
    //   }
    // });

    resetHandler();
    history.push("/diario");
  };

  const emotionList = useSelector((state) => state.emotionList);
  const { emotions } = emotionList;

  useEffect(() => {
    dispatch(listEmotions());
  }, [dispatch]);

  return (
    <MainScreen title="Mi Entrada">
      <Card>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Ponle un nombre a tu día</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>¿Como te sientes?</Form.Label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {emotions?.map((emotion) => (
                    <div onClick={(e) => alert(emotion.name)}>
                      <img src={emotion.icon} width="50" height="50" />
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Cuéntanos mas sobre tu día</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Guardar entrada
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default CreateEntryPage;
