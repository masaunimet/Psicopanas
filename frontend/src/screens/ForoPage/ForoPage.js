import React from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { InputGroup, Button, FormGroup, Container, FormControl } from "react-bootstrap";

const ForoPage = ({ history }) => {

    return (

        <MainScreen title="foro">
            <div className="foro_main_window">
                <div className="chat">
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                    <p>hols</p>
                </div>
            </div>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Escriba aqui"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                />
                <Button id="button-addon2">
                    Enviar
                </Button>
            </InputGroup>
        </MainScreen>
    );
};

export default ForoPage;