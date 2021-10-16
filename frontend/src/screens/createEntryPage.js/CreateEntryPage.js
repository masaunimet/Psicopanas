import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEntryAction } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { listTags } from "../../actions/tagActions";

function CreateEntryPage({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const entryCreate = useSelector((state) => state.entryCreate);
  const { loading, error } = entryCreate;

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const entryTags = [];

    tags?.map((tag) => {
      if (document.getElementById(tag._id).checked === true) {
        entryTags.push(tag.name);
      } else {
      }
    });

    dispatch(createEntryAction(title, content, entryTags));
    if (!title || !content) return;
    resetHandler();
    history.push("/diario");
  };

  //useEffect(() => {}, []);

  const tagList = useSelector((state) => state.tagList);
  const { tags } = tagList;

  useEffect(() => {
    dispatch(listTags());
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

            <Form.Group controlId="tag">
              <Form.Label>¿Qué te hizo sentir así?</Form.Label>
              <div style={{ display: "flex" }}>
                {tags?.map((tag) => (
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={tag._id}
                      style={{ margin: 5 }}
                    >
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>{tag.name}</Form.Check.Label>
                    </Form.Check>
                  </div>
                ))}
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
