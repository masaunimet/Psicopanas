import React, {Component} from "react";
import {Bar,Line,Pie} from "react-chartjs-2";

class EstadisticasColumna extends Component{

    constructor(props){

        super(props);
        this.state={
            chartData:props.chartData
        };
    }

    render(){

        return(

            <div>
                <Bar
                    data={this.state.chartData}
                    width={100}
                    height={50}
                    options={{
                        // title:{

                        //     display:true,
                        //     text:"Estado de animo",
                        //     fontsSize:{25}
                        // },
                        // legend:{

                        //     display:true,
                        //     position:"right"
                        // }
                    }}
                />
            </div>
        )
    }
}

export default EstadisticasColumna;