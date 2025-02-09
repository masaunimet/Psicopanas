import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import LogoPP from "../../images/logoPP.png";
import "../header/Header.css";

/**
  * @desc Es un componente que sirve para ser el navbar
*/
const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  /**@desc es una funcion que sirve para deslogerse con logout e ir al home*/
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <div className="all">
      <Navbar bg="#f6f6f6" expand="lg" variant="dark" className="all">
        <Container fluid>
          {userInfo ? (
            <Navbar.Brand href="/diario">
              <img src={LogoPP} width="50" height="50" alt="" />
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="/">
              <img src={LogoPP} width="50" height="50" alt="" />
            </Navbar.Brand>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {userInfo ? (
              <Nav variant="pills" activeKey="1">
                {userInfo.isAdmin === true ? (
                  <>
                    <Nav.Item className="padding_butons">
                      <NavLink
                        to="/admin"
                        className="textnavbar"
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#0FA5AE",
                        }}
                      >
                        Usuarios
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="padding_butons">
                      <NavDropdown
                        title="Lecturas"
                        id="basic-nav-dropdowm"
                        className="textnavbar"
                      >
                        <NavDropdown.Item
                          href="/admin-listar-lecturas"
                          className="textnavbar"
                        >
                          Listar
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          href="/admin-crear-lectura"
                          className="textnavbar"
                        >
                          Crear
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav.Item>
                    <Nav.Item className="padding_butons">
                      <NavLink
                        to="/login"
                        className="textnavbar"
                        onClick={logoutHandler}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#0FA5AE",
                        }}
                      >
                        Log Out
                      </NavLink>
                    </Nav.Item>
                  </>
                ) : (
                  <>
                    <Nav.Item className="padding_butons">
                      <NavLink
                        to="/sobre-Psico-Panas"
                        className="textnavbar"
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#0FA5AE",
                        }}
                      >
                        PsicoPanas
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="padding_butons">
                      {userInfo.diarySecurity === true ? (
                        <NavLink
                          to="/authDiario"
                          className="textnavbar"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "#0FA5AE",
                          }}
                        >
                          Diario
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/diario"
                          className="textnavbar"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "#0FA5AE",
                          }}
                        >
                          Diario
                        </NavLink>
                      )}
                    </Nav.Item>

                    <Nav.Item className="padding_butons">
                      <NavLink
                        to="/lecturas"
                        className="textnavbar"
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#0FA5AE",
                        }}
                      >
                        Lecturas
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="padding_butons">
                      {!userInfo.isPremium ? (
                        <NavLink
                          to="/pagos"
                          className="textnavbar"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "#0FA5AE",
                          }}
                        >
                          Pagos
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/foro"
                          className="textnavbar"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "#0FA5AE",
                          }}
                        >
                          Foro
                        </NavLink>
                      )}
                    </Nav.Item>
                    <Nav.Item className="padding_butons">
                      <NavLink
                        to="/perfil"
                        className="textnavbar"
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#0FA5AE",
                        }}
                      >
                        Perfil
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="padding_butons">
                      <NavLink
                        to="/"
                        className="textnavbar"
                        onClick={logoutHandler}
                      >
                        Cerrar sesión
                      </NavLink>
                    </Nav.Item>
                  </>
                )}
              </Nav>
            ) : (
              <Nav variant="pills" activeKey="1">
                <Nav.Item className="padding_butons">
                  <NavLink
                    to="/login"
                    className="textnavbar"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#0FA5AE",
                    }}
                  >
                    Iniciar Sesión
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="padding_butons">
                  <NavLink
                    to="/registro"
                    className="textnavbar"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#0FA5AE",
                    }}
                  >
                    Registrarse
                  </NavLink>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
