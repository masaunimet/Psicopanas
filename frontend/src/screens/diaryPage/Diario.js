import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen/MainScreen";
import axios from "axios";

const Diario = () => {
  const [notes, setNotes] = useState([]);
  const fetchEntrys = async () => {
    const { data } = await axios.get("/api/entrys");
    setNotes(data);
  };

  useEffect(() => {
    fetchEntrys();
  }, []);

  return (
    <MainScreen title="Diario">
      <Link to="/createEntry">
        <Button size="md">Crear Entrada</Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id}>
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
                {note.title}
              </Accordion.Toggle>
              <div>
                <Button href={`/note/${note._id}`}>Editar</Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
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
