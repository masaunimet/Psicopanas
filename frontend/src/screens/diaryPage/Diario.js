import React, { useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { listEntries } from "../../actions/entryActions";
import { listTags } from "../../actions/tagActions";
import { listEmotions } from "../../actions/emotionAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Diario = ({ history }) => {
  const dispatch = useDispatch();

  const entryList = useSelector((state) => state.entryList);
  const { loading, error, entries } = entryList;

  const tagList = useSelector((state) => state.tagList);
  const { tags } = tagList;

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

  useEffect(() => {
    dispatch(listTags());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successCreate, successUpdate]);

  useEffect(() => {
    dispatch(listEmotions());
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
          <Card
            style={{
              margin: 10,
              borderColor: "#11CBD6",
              background: "#f6f6f6",
              borderRadius: "10px",
            }}
          >
            <Card.Header style={{ display: "flex" }}>
              <img src={entry.emotion} width="50" height="50" />
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
                <div
                  style={{
                    marginLeft: "10px",
                    color: "#797979",
                    fontWeight: "bold",
                  }}
                >
                  {moment(entry.createdAt).format("YYYY-DD-MM")}{" "}
                </div>
              </Accordion.Toggle>
              <div
                style={{
                  color: "#AB2975",
                  marginRight: "10px",
                  fontWeight: "bold",
                }}
              >
                {entry.title}
              </div>
              <div>
                <Button
                  href={`/diario/${entry._id}`}
                  style={{
                    background: "#f6f6f6",
                    padding: "0",
                    margin: "0",
                    border: "none",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/psicopanas/image/upload/v1634441688/iconPencil_zngxxh.png"
                    width="20px"
                    height="20px"
                  />
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div style={{ display: "flex" }}>
                  {entry.tags?.map((tag) => (
                    <div
                      style={{
                        marginRight: "5px",
                        color: "#0a656b",
                        background: "#bcf4fc",
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        borderRadius: "2px",
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <blockquote className="blockquote mb-0">
                  <div
                    style={{
                      color: "#171717",
                      marginTop: "10px",
                      textAlign: "justify",
                      fontSize: "15px",
                    }}
                  >
                    {entry.content}
                  </div>
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
