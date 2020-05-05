import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Slider from 'react-native-slider';
import {styles} from './StyleButton';
 class Button extends React.Component{
     constructor(props){
            super(props);

            this.state = {
                Value: 0,
                pressStatus: false,
                Value2: 0,
                pressStatus2: false,
                Value3: 0,
                pressStatus3: false,
                //slider
                valueSli:5,
                abi:true,
                ValueStep:1,
                ChangeValor:10,
                //buttons
                valueB1:5,
                valueB2:8,
                valueB3:56
                
            };

            this.B1Onclick = this.B1Onclick.bind(this);
            this.B2Onclick = this.B2Onclick.bind(this);
            this.B3Onclick = this.B3Onclick.bind(this);
     }

     B1Onclick(){
         if(this.state.Value2 % 2 == 0 && this.state.Value3 % 2 == 0){
                const { Value: VA } = this.state;
                this.setState({ Value: VA + 1 });
                
                if (VA % 2 == 0){
                    this.state.valueSli=this.state.valueB1;
                    this.setState({ pressStatus: true });
                    this.setState({ abi: false });
                    this.setState({ ValueStep:1});
                    this.setState({ ChangeValor:10});
                }
                else{
                    this.setState({ pressStatus: false });
                    this.setState({ abi: true });
                    this.setState({valueB1: this.state.valueSli});
                }
            }
            else{

            }
     }
     B2Onclick(){
        if(this.state.Value % 2 == 0 && this.state.Value3 % 2 == 0){
                const { Value2: VA2 } = this.state;
                this.setState({ Value2: VA2 + 1 });
                if (VA2 % 2 == 0){
                    this.state.valueSli=this.state.valueB2;
                    this.setState({ pressStatus2: true });
                    this.setState({ abi: false });
                    this.setState({ ValueStep:.1});
                    this.setState({ ChangeValor:10});
                }
                else{
                    this.setState({ pressStatus2: false });
                    this.setState({ abi: true });
                    this.setState({valueB2: this.state.valueSli});
                }
        }
    }
    B3Onclick(){
        if(this.state.Value2 % 2 == 0 && this.state.Value % 2 == 0){
                    const { Value3: VA3 } = this.state;
                    this.setState({ Value3: VA3 + 1 });
                    if (VA3 % 2 == 0){
                        this.state.valueSli=this.state.valueB3;
                    this.setState({ pressStatus3: true }); 
                        this.setState({ abi: false });
                        this.setState({ ValueStep:1});
                        this.setState({ ChangeValor:100});
                    }
                    else{
                    this.setState({ pressStatus3: false });
                    this.setState({ abi: true });
                    this.setState({valueB3: this.state.valueSli});
                    }
        }
    }


    render(){
        const { abi, valueSli, ValueStep,ChangeValor, valueB1, valueB2, valueB3 } = this.state;
        
                return(
                            <View style={styles.Buttons} >
                               
                            <TouchableOpacity style={
                                    this.state.pressStatus
                                        ? styles.btnPress
                                        : styles.btn} 
                                onPress={this.B1Onclick}>
                                <Text style={
                                    this.state.pressStatus
                                        ? styles.NumberbtnPress
                                        : styles.Numberbtn
                                }>{this.state.pressStatus
                                    ? valueSli
                                    : valueB1}</Text>
                                <Text style={styles.textbtn}>mL</Text>
                            
                            </TouchableOpacity>



                            <TouchableOpacity style={
                                    this.state.pressStatus2
                                        ? styles.btnPress
                                        : styles.btn}
                                    onPress={this.B2Onclick}>
                                <Text style={
                                    this.state.pressStatus2
                                        ? styles.NumberbtnPress
                                        : styles.Numberbtn
                                }>{this.state.pressStatus2
                                    ? valueSli
                                    : valueB2}</Text>
                                <Text style={styles.textbtn}>L/min</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={
                                    this.state.pressStatus3
                                        ? styles.btnPress
                                        : styles.btn}
                                    onPress={this.B3Onclick}>
                                <Text style={
                                    this.state.pressStatus3
                                        ? styles.NumberbtnPress
                                        : styles.Numberbtn
                                }>{ this.state.pressStatus3
                                    ? valueSli
                                    : valueB3}</Text>
                                <Text style={styles.textbtn}>bpm</Text>
                            </TouchableOpacity>


                            <View style={styles.container}>
                                    <Slider
                                        minimumValue={0}
                                        maximumValue={ChangeValor}
                                        disabled={abi}
                                        step={ValueStep}
                                        minimumTrackTintColor='#1fb28a'
                                        maximumTrackTintColor='#d3d3d3'
                                        value={this.state.valueSli}
                                        onValueChange={(valueSli) => this.setState({valueSli})} />
                            </View>

                         </View>
                );
    }   
}
export default Button