import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEntryAction } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { listTags } from "../../actions/tagActions";
import { listEmotions } from "../../actions/emotionAction";

import moment from "moment";

let setEmotion = "";

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

  //useEffect(() => {}, []);

  const tagList = useSelector((state) => state.tagList);
  const loading2 = tagList.loading;
  const { tags } = tagList;

  const emotionList = useSelector((state) => state.emotionList);
  const loading3 = emotionList.loading;
  const { emotions } = emotionList;

  const today = new Date();

  useEffect(() => {
    dispatch(listEmotions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listTags());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    const entryTags = [];

    tags?.map((tag) => {
      if (document.getElementById(tag._id).checked === true) {
        entryTags.push(tag.name);
      } else {
      }
    });

    if (!title || !content) return;
    dispatch(createEntryAction(title, content, entryTags, setEmotion));

    resetHandler();
    history.push("/diario");
  };

  const visualButtons = (id, icon) => {
    emotions?.map((emotion) => {
      if (emotion._id != id) {
        document.getElementById(emotion._id)?.setAttribute("width", "50");
        document.getElementById(emotion._id)?.setAttribute("height", "50");
      } else {
        document.getElementById(emotion._id)?.setAttribute("width", "80");
        document.getElementById(emotion._id)?.setAttribute("height", "80");
      }
    });
  };

  return (
    <MainScreen title={moment(today).format("YYYY-DD-MM")}>
      <Card
        style={{
          background: "none",
          border: "none",
        }}
      >
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Ponle un título a tu día
              </Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                ¿Como te sientes?
              </Form.Label>
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
                  {loading3 && <Loading size={25} />}
                  {emotions?.map((emotion) => (
                    <div
                      onClick={(e) => {
                        visualButtons(emotion._id);
                        setEmotion = emotion.icon;
                      }}
                    >
                      <img
                        id={emotion._id}
                        src={emotion.icon}
                        width="50"
                        height="50"
                      />
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {emotion.name}
                      </p>
                      {document
                        .getElementById("616b11858f059d3c912e9944")
                        ?.click()}
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="tag">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                ¿Qué te hizo sentir así?
              </Form.Label>
              <div style={{ display: "flex" }}>
                {loading2 && <Loading size={25} />}
                {tags?.map((tag) => (
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={tag._id}
                      style={{ marginLeft: "15px", marginTop: "5px" }}
                    >
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label
                        style={{ color: "#171717", fontSize: "15px" }}
                      >
                        {tag.name}
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label
                style={{
                  color: "#0A656B",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Cuéntanos mas sobre tu día
              </Form.Label>
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
