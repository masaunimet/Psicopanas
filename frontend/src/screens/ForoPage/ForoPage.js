import React, {useEffect,  useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import {listForomessages, createForoMessage} from "../../actions/foromessageAction";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Button, FormGroup, Container, FormControl } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../../styles/App.css";

const ForoPage = ({ history }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const foromessageList = useSelector((state) => state.foromessageList);
    const { loading, error, foromessages } = foromessageList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
          history.push("/");
        } else {
          if (userInfo.isAdmin === true) {
            history.push("/admin");
          }
        }
      });

    useEffect(() => {
        dispatch(listForomessages());
      }, [dispatch]);

      function isEmpty(str) {
        return !str || 0 === str.length;
      }

    const submitHandler = (e) => {
      e.preventDefault();

      if (isEmpty(content.trim())) {}

      else{

        dispatch(
          createForoMessage(userInfo.name,content,userInfo.profilePicture)
        );

        setContent("");
      }
    }

    return (

        <MainScreen title="foro">
            <div className="foro_main_window">
                <div className="chat">
                {foromessages?.map((message)=>
                    <div key={message._id} style={{display:"flex", margin:"10px"}}>
                      <div>
                        <img src="https://static.wikia.nocookie.net/sonic/images/2/2d/TSR_Sonic.png/revision/latest?cb=20200114015342&path-prefix=es" width="50" height="50" style={{borderRadius:"50%"}}/>
                      </div>
                      <div style={{display:"flex", alignItems:"flex-start",marginLeft:"10px",marginRight:"5px",marginLeft:"5px"}}>
                        <div>
                        <p style={{display:"flex", alignItems:"flex-start",margin:"0px"}}>{message.username}</p>
                        <p style={{display:"flex", alignItems:"flex-start",margin:"0px",backgroundColor:"grey",borderRadius:"15%",paddingLeft:"5px",paddingRight:"5px"}}>{message.message}</p>
                        </div>
                      </div>
                    </div>
                    )}
                </div>
            </div>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Escriba aqui"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={content}
                rows={2}
                onChange={(e) => setContent(e.target.value)}
                />
                <Button id="button-addon2" onClick={submitHandler}>
                    Enviar
                </Button>
            </InputGroup>
        </MainScreen>
    );
};

export default ForoPage;