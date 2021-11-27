import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";
import Media from "react-media";

/**
  * @desc Es la funcion componente que sirve como fondo y placheholder de pagina
  * @param children codigo de la pagina
  * @param title string titulo de la pagina
*/
function MainScreen({ children, title }) {
  return (
    <>
    <div style={{height:"10vh", background:"#F6F6F6"}}></div>
    <div className="spacer layer1">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default MainScreen;
