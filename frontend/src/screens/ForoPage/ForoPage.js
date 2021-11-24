import React, {useEffect,  useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import {listForomessages, createForoMessage} from "../../actions/foromessageAction";
import {listForomessagessalud,createForoMessagesalud} from "../../actions/foromessagesaludAction";
import {listForomessagesvivencias,createForoMessagevivencia} from "../../actions/foromessagevivenciaAction";
import {listForomessageshobbies,createForoMessagehobbie} from "../../actions/foromessagehobbieAction";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Button, FormGroup, Container, FormControl } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../../styles/App.css";

const ForoPage = ({ history }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const imgs = ["https://image.flaticon.com/icons/png/512/16/16363.png"];

    const foromessageList = useSelector((state) => state.foromessageList);
    const { foromessages } = foromessageList;

    const foromessagesaludList = useSelector((state) => state.foromessagesaludList);
    const { foromessagessalud } = foromessagesaludList;

    const foromessagevivenciaList = useSelector((state) => state.foromessagevivenciaList);
    const { foromessagesvivencias} = foromessagevivenciaList;

    const foromessagehobbieList = useSelector((state) => state.foromessagehobbieList);
    const { foromessageshobbies} = foromessagehobbieList;

    const [option, setOption] = useState(0);

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

      useEffect(() => {
        dispatch(listForomessagessalud());
      }, [dispatch]);

      useEffect(() => {
        dispatch(listForomessagesvivencias());
      }, [dispatch]);

      useEffect(() => {
        dispatch(listForomessageshobbies());
      }, [dispatch]);

      function isEmpty(str) {
        return !str || 0 === str.length;
      }


    const submitHandlerAnon= (e) => {
      e.preventDefault();

      if (isEmpty(content.trim())) {}

      else{

        if(option===0){

          dispatch(
            createForoMessage("Anon",content,imgs[0])
          );
        }

        else if(option===1){

          dispatch(
            createForoMessagesalud("Anon",content,imgs[0])
          );
        }

        else if(option===2){

          dispatch(
            createForoMessagevivencia("Anon",content,imgs[0])
          );
        }

        else if(option===3){

          dispatch(
            createForoMessagehobbie("Anon",content,imgs[0])
          );
        }

        setContent("");
      }
    }

    const submitHandler = (e) => {
      e.preventDefault();

      if (isEmpty(content.trim())) {}

      else{

        if(option===0){

          dispatch(
            createForoMessage(userInfo.name,content,userInfo.profilePicture)
          );
        }

        else if(option===1){

          dispatch(
            createForoMessagesalud(userInfo.name,content,userInfo.profilePicture)
          );
        }

        else if(option===2){

          dispatch(
            createForoMessagevivencia(userInfo.name,content,userInfo.profilePicture)
          );
        }

        else if(option===3){

          dispatch(
            createForoMessagehobbie(userInfo.name,content,userInfo.profilePicture)
          );
        }

        setContent("");
      }
    }

    const forodisplay=()=>{

      if(option===0){
        return foromessages?.map((message)=>
        <div key={message._id} style={{display:"flex", margin:"10px"}}>
          <div>
            <img src={message.icon} width="50" height="50" style={{borderRadius:"50%"}}/>
          </div>
          <div style={{display:"flex", alignItems:"flex-start",marginLeft:"10px",marginRight:"5px",marginLeft:"5px"}}>
            <div>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px"}}>{message.username}</p>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px",backgroundColor:"grey",borderRadius:"15%",paddingLeft:"5px",paddingRight:"5px"}}>{message.message}</p>
            </div>
          </div>
        </div>
        )
      }

      else if(option===1){
        return foromessagessalud?.map((message)=>
        <div key={message._id} style={{display:"flex", margin:"10px"}}>
          <div>
            <img src={message.icon} width="50" height="50" style={{borderRadius:"50%"}}/>
          </div>
          <div style={{display:"flex", alignItems:"flex-start",marginLeft:"10px",marginRight:"5px",marginLeft:"5px"}}>
            <div>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px"}}>{message.username}</p>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px",backgroundColor:"grey",borderRadius:"15%",paddingLeft:"5px",paddingRight:"5px"}}>{message.message}</p>
            </div>
          </div>
        </div>
        )
      }

      else if(option===2){
        return foromessagesvivencias?.map((message)=>
        <div key={message._id} style={{display:"flex", margin:"10px"}}>
          <div>
            <img src={message.icon} width="50" height="50" style={{borderRadius:"50%"}}/>
          </div>
          <div style={{display:"flex", alignItems:"flex-start",marginLeft:"10px",marginRight:"5px",marginLeft:"5px"}}>
            <div>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px"}}>{message.username}</p>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px",backgroundColor:"grey",borderRadius:"15%",paddingLeft:"5px",paddingRight:"5px"}}>{message.message}</p>
            </div>
          </div>
        </div>
        )
      }

      else if(option===3){
        return foromessageshobbies?.map((message)=>
        <div key={message._id} style={{display:"flex", margin:"10px"}}>
          <div>
            <img src={message.icon} width="50" height="50" style={{borderRadius:"50%"}}/>
          </div>
          <div style={{display:"flex", alignItems:"flex-start",marginLeft:"10px",marginRight:"5px",marginLeft:"5px"}}>
            <div>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px"}}>{message.username}</p>
            <p style={{display:"flex", alignItems:"flex-start",margin:"0px",backgroundColor:"grey",borderRadius:"15%",paddingLeft:"5px",paddingRight:"5px"}}>{message.message}</p>
            </div>
          </div>
        </div>
        )
      }
    }

    return (

        <MainScreen title="foro">
            <div style={{display:"flex", justifyContent:"center"}}>
              <Button variant="secondary" onClick={(e) => {setOption(0);}}>General</Button>
              <Button variant="secondary" onClick={(e) => {setOption(1);}}>Vivencias</Button>
              <Button variant="secondary" onClick={(e) => {setOption(2);}}>Salud</Button>
              <Button variant="secondary" onClick={(e) => {setOption(3);}}>Hobbies</Button>
            </div>
            <div className="foro_main_window">
                <div className="chat">
                  {forodisplay()}
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
                <Button id="button-addon2" onClick={submitHandlerAnon}>
                    Enviar como anon
                </Button>
            </InputGroup>
        </MainScreen>
    );
};

export default ForoPage;