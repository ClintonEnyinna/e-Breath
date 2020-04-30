import {StyleSheet,Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    
    Buttons:{
        flexDirection:'row',
    },
    btn:{
      width: Dimensions.get('window').width * 0.1,
      height: Dimensions.get('window').width * 0.1,
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 10,
      backgroundColor:'#000' ,
      justifyContent: 'center',
      alignItems:'center',
      borderColor: '#3B3B3A',
      borderWidth: 6,
      shadowColor: '#3B3B3A',
      shadowRadius: 10,
      shadowOpacity: 1,
      elevation: 20,
      marginLeft:Dimensions.get('window').width * 0.17,
    },
    
    Numberbtn:{
        fontSize:37,
        color:'#42C2F4',
        fontFamily:'Times New Roman',
    },
    textbtn:{
        fontSize:13,
        color:'#fff',
        fontFamily:'Times New Roman',
        alignItems:"center"  
    },
  });
