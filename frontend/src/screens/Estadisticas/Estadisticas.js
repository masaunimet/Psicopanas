import React, { Component} from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import EstadisticaColumna from "../../components/Estadisticas/EstadisticasColumna";



class Estadisticas extends Component {

    constructor(){

        super();
        this.state = {

            chartData:{}
        }
    }

    componentWillMount(){

        this.getChartData();
    }

    getChartData(){

        this.setState({

            chartData:{
                labels:["Muy Feliz","Feliz","Normal","Triste","Muy Triste"],
                datasets:[{
                    label:"Numero de entradas",
                    data:[
                        30,
                        15,
                        60,
                        30,
                        30
                    ],
                    backgroundColor:[

                        "rgba(255,0,0,0.6)",
                        "rgba(0,255,0,0.6)",
                        "rgba(0,0,255,0.6)",
                        "rgba(255,255,0,0.6)",
                        "rgba(0,255,255,0.6)"
                    ]
                }]
            }
        });
    }

    render(){

        return(
            <MainScreen title="Estadisticas">
                <EstadisticaColumna chartData ={this.state.chartData}/>
            </MainScreen>
        );
    } 
};
 
export default Estadisticas;