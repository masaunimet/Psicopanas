import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import LogoPP from "../../images/logoPP.png";
import "../header/Header.css";

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
<Navbar bg="#f6f6f6" expand="lg" variant="dark">
<Container fluid>
  <Navbar.Brand>
    <img
      src={LogoPP}
      width="50"
      height="50"
      alt=""
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse className="justify-content-end">
  {userInfo ? ( 
    <Nav variant="pills" activeKey="1">
      <Nav.Item className="padding_butons"><Nav.Link eventKey="disabled" disabled href="/diario" className="textnavbar">Metas</Nav.Link></Nav.Item>
      <Nav.Item className="padding_butons" ><Nav.Link eventKey="disabled" disabled href="/diario" className="textnavbar">Foro</Nav.Link></Nav.Item>
      <Nav.Item className="padding_butons"><Nav.Link eventKey="1" href="/diario" className="textnavbar">Diario</Nav.Link></Nav.Item>
    <Nav.Item>
      <NavDropdown title="Mi cuenta" id="basic-nav-dropdowm" className="textnavbar">
        <NavDropdown.Item href="#action3">Perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logoutHandler}>Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    </Nav.Item>
    </Nav>
  ) :
  (
    <Nav variant="pills" activeKey="1">
      <Nav.Item className="padding_butons"><Nav.Link href="/login" className="textnavbar" eventKey="1">Iniciar Seción</Nav.Link></Nav.Item>
    </Nav>
  )}
  </Navbar.Collapse>
</Container>
</Navbar> 
  );
};

export default Header;
