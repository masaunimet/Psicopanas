import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar bg="#d71b1b" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={LogoPP} width="50" height="50" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {userInfo ? (
              <>
                <Nav.Link>
                  <Link to="/diario">Diario</Link>
                </Nav.Link>
                <NavDropdown title="Mi cuenta" id="basic-nav-dropdowm">
                  {/*<NavDropdown.Item href="#action3">Perfil</NavDropdown.Item>
  <NavDropdown.Divider />*/}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Iniciar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // </Nav.Item >
    // <Nav className="m-auto">
    //   <Form inline>
    //     <FormControl
    //       type="text"
    //       placeholder="Search"
    //       className="nr-sm-2"
    //     />
    //   </Form>
    // </Nav>
    // <Nav>
    //   <Nav.Link>
    //     <Link to="/diario">Diario</Link>
    //   </Nav.Link>
    //   <NavDropdown title="Mi cuenta" id="basic-nav-dropdowm">
    //     <NavDropdown.Item href="#action3">Perfil</NavDropdown.Item>

    //     <NavDropdown.Divider />
    //     <NavDropdown.Item href="#action5">Cerrar sesión</NavDropdown.Item>
    //   </NavDropdown>
    // </Nav>
  );
};

export default Header;
