import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/mainscreen/MainScreen";

const AdminPage = ({ history }) => {
  const dispatch = useDispatch();

  const getAllUsers = useSelector((state) => state.getAllUsers);
  const { loading, error, usersInfo } = getAllUsers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo?.isAdmin === false) {
        history.push("/");
      } else {
        dispatch(getUsers());
      }
    }
  }, [dispatch, history, userInfo]);

  return (
    <MainScreen title="Administrador">
      <Container>
        <Row>
          <h2>Lista de Usuarios</h2>
        </Row>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {usersInfo?.map((user) => (
          <Row>
            <Col>{user._id}</Col>
            <Col>{user.email}</Col>
            <Col>
              {user.isPremium === true ? <div>Premium</div> : <div>Free</div>}
            </Col>
            <Col>
              <Button href={`/admin/${user._id}`}>Cambiar status</Button>
            </Col>
            <Col>
              <Button>Eliminar</Button>
            </Col>
          </Row>
        ))}
      </Container>
    </MainScreen>
  );
};

export default AdminPage;
