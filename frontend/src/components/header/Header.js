import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoPP from "../../images/logoPP.png";
import User from "../../images/usuario_default.png";
import "../header/Header.css";

const Header = () => {
  return (
    <Navbar bg="#d71b1b" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={LogoPP}
            width="50"
            height="50"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav variant="pills" activeKey="1">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="nr-sm-2"
              />
            </Form>
            <Nav.Item className="padding_butons"><Nav.Link eventKey="disabled" disabled href="/diario" className="textnavbar">Metas</Nav.Link></Nav.Item>
            <Nav.Item className="padding_butons" ><Nav.Link eventKey="disabled" disabled href="/diario" className="textnavbar">Foro</Nav.Link></Nav.Item>
            <Nav.Item className="padding_butons"><Nav.Link eventKey="1" href="/diario" className="textnavbar">Diario</Nav.Link></Nav.Item>
          </Nav>
          <Nav.Item>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdowm">
              <NavDropdown.Item href="#action3">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
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
