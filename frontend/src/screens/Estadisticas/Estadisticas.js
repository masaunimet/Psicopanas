import React, { useEffect} from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";

import { useDispatch, useSelector } from "react-redux";
import { listEntries } from "../../actions/entryActions";
import { listEmotions } from "../../actions/emotionAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Estadisticas = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const entryList = useSelector((state) => state.entryList);
    const { loading, error, entries } = entryList;
    const emotionList = useSelector((state) => state.emotionList);
    const { emotions } = emotionList;

    let muyFeliz =0;
    let feliz =0;
    let Normal =0;
    let triste =0;
    let muyTriste =0;

    const idemotions = emotions?.map((emotion)=>emotion._id);

    const Logic =entry=>{

        console.log(idemotions);
        console.log(entry);

        if(entry._id === idemotions[0])
            muyFeliz++;
        else if(entry._id === idemotions[1])
            feliz++;
        else if(entry._id === idemotions[2])
            Normal++;
        else if(entry._id === idemotions[3])
            triste++;
        else if(entry._id === idemotions[4])
            muyTriste++;
    };

    useEffect(() => {
        dispatch(listEmotions());
      }, [dispatch]);

    useEffect(() => {
        dispatch(listEntries());
        if (!userInfo) {
           history.push("/");
        }
        entries?.map((entry)=>(Logic(entry)));
    }, [dispatch, history, userInfo]);  

    //console.log("MuyFeliz:"+muyFeliz+", Feliz:"+feliz+", Normal:"+Normal+", Triste:"+triste+", MuyTriste:"+muyTriste);

    let data ={
        labels:["Muy Feliz","Feliz","Normal","Triste","Muy Triste"],
        datasets:[{
            label:"Numero de entradas",
            data:[
                {muyFeliz},
                {feliz},
                {Normal},
                {triste},
                {muyTriste}
            ],
            backgroundColor:[
        
                "rgba(255,0,0,0.6)",
                "rgba(0,255,0,0.6)",
                "rgba(0,0,255,0.6)",
                "rgba(255,255,0,0.6)",
                "rgba(0,255,255,0.6)"
                ]  
            }]
        };

    return(
        <MainScreen title="Estadisticas">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <EstadisticaColumna chartData ={data} />
        </MainScreen>
    );
}
 
export default Estadisticas;