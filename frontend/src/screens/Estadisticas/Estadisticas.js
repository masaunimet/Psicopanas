import React, { useEffect} from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";

import { useDispatch, useSelector } from "react-redux";
import { listEntries } from "../../actions/entryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Estadisticas = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const entryList = useSelector((state) => state.entryList);
    const { loading, error, entries } = entryList;

    useEffect(() => {
        dispatch(listEntries());
        if (!userInfo) {
           history.push("/");
        }
    }, [dispatch, history, userInfo]);

    return(
        <MainScreen title="Estadisticas">
                
        </MainScreen>
    );
}

// class Estadisticas extends Component {

//     constructor(){

//         super();
//         this.state = {

//             chartData:{}
//         }
//     }

//     componentWillMount(){

//         this.getChartData();
//     }

//     getChartData(){

//         this.setState({

//             chartData:{
//                 labels:["Muy Feliz","Feliz","Normal","Triste","Muy Triste"],
//                 datasets:[{
//                     label:"Numero de entradas",
//                     data:[
//                         30,
//                         15,
//                         60,
//                         30,
//                         30
//                     ],
//                     backgroundColor:[

//                         "rgba(255,0,0,0.6)",
//                         "rgba(0,255,0,0.6)",
//                         "rgba(0,0,255,0.6)",
//                         "rgba(255,255,0,0.6)",
//                         "rgba(0,255,255,0.6)"
//                     ]
//                 }]
//             }
//         });
//     }

//     render(){

//         return(
//             <MainScreen title="Estadisticas">
//                 <EstadisticaColumna chartData ={this.state.chartData}/>
//             </MainScreen>
//         );
//     } 
// };
 
export default Estadisticas;