import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CircleSlider from './SliderButton';
import {styles} from './StyleButton' ;
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
            };

            this.B1Onclick = this.B1Onclick.bind(this);
            this.B2Onclick = this.B2Onclick.bind(this);
            this.B3Onclick = this.B3Onclick.bind(this);
     }

     B1Onclick(){
         //le damos un nuevo valor con el on click
           const { Value: VA } = this.state;
           this.setState({ Value: VA + 1 });
           if (VA % 2 == 0){
            this.setState({ pressStatus: true });
           }
           else{
            this.setState({ pressStatus: false });
           }
     }
     B2Onclick(){
        //le damos un nuevo valor con el on click
          const { Value2: VA2 } = this.state;
          this.setState({ Value2: VA2 + 1 });
          if (VA2 % 2 == 0){
           this.setState({ pressStatus2: true });
          }
          else{
           this.setState({ pressStatus2: false });
          }
    }
    B3Onclick(){
        //le damos un nuevo valor con el on click
          const { Value3: VA3 } = this.state;
          this.setState({ Value3: VA3 + 1 });
          if (VA3 % 2 == 0){
           this.setState({ pressStatus3: true });
          }
          else{
           this.setState({ pressStatus3: false });
          }
    }


    render(){
        const { Value } = this.state;
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
                                }>{Value}</Text>
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
                                }>8.0</Text>
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
                                }>56</Text>
                                <Text style={styles.textbtn}>bpm</Text>
                            </TouchableOpacity>

                            </View>
                );
    }   
}
export default Button