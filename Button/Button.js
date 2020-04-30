import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './StyleButton' 
 function Button(props){
    return(
                <View style={styles.Buttons} >
                  <TouchableOpacity style={styles.btn}>
                      <Text style={styles.Numberbtn}>50</Text>
                      <Text style={styles.textbtn}>mL</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btn}>
                      <Text style={styles.Numberbtn}>8.0</Text>
                      <Text style={styles.textbtn}>L/min</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btn}>
                      <Text style={styles.Numberbtn}>56</Text>
                      <Text style={styles.textbtn}>bpm</Text>
                  </TouchableOpacity>
                </View>
    );

}
export default Button