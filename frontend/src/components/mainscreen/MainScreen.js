import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

function MainScreen({ children, title }) {
  return (
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
  );
}

export default MainScreen;
