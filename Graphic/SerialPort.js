import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import {RNSerialport, definitions, actions} from 'react-native-serialport';
//type Props = {};
class ManualConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      i: 0,
      servisStarted: false,
      connected: false,
      usbAttached: false,
      contentInset: {top: 20, bottom: 20},
      mLdata : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      presureData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      BMPdata : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      output: '',
      receivedData: '',
      outputArray: [],
      baudRate: '115200',
      interface: '-1',
      returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING,
    };

    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
  }

  handleSendButton() {
    RNSerialport.writeString(this.state.sendText);
  }

  componentDidMount() {
    this.startUsbListener();
  }

  componentWillUnmount() {
    this.stopUsbListener();
  }

  startUsbListener() {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      this.onServiceStarted,
      this,
    );
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      this.onServiceStopped,
      this,
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      this.onDeviceAttached,
      this,
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      this.onDeviceDetached,
      this,
    );
    DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
    DeviceEventEmitter.addListener(
      actions.ON_CONNECTED,
      this.onConnected,
      this,
    );
    DeviceEventEmitter.addListener(
      actions.ON_DISCONNECTED,
      this.onDisconnected,
      this,
    );
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
    RNSerialport.setReturnedDataType(this.state.returnedDataType);
    RNSerialport.setAutoConnectBaudRate(parseInt(this.state.baudRate, 10));
    RNSerialport.setInterface(parseInt(this.state.interface, 10));
    RNSerialport.setAutoConnect(true);
    RNSerialport.startUsbService();
  }

  stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      Alert.alert('isOpen', isOpen);
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  onServiceStarted(response) {
    this.setState({servisStarted: true});
    if (response.deviceAttached) {
      this.onDeviceAttached();
    }
  }
  onServiceStopped() {
    this.setState({servisStarted: false});
  }
  onDeviceAttached() {
    this.setState({usbAttached: true});
  }
  onDeviceDetached() {
    this.setState({usbAttached: false});
  }
  onConnected() {
    this.setState({connected: true});
  }
  onDisconnected() {
    this.setState({connected: false});
  }
  /* read data from ESP32 */
  onReadData(data) {
    if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
    ) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      this.setState({output: this.state.output + payload});
    } else if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
    ) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      
      const testStr = /0D0A/.test(data.payload);
      const coma = /2C/.test(data.payload);   

      if (!testStr) { 
        if(!coma){
          this.state.receivedData = this.state.receivedData + payload;
        }else{
          //this.state.receivedData = this.state.receivedData + payload;
          //this.setState({output: this.state.receivedData});
          this.setState({i: this.state.i +1});
          
          const payloadFloat = parseFloat(this.state.receivedData);

          switch(this.state.i){
            case 1:
              if(Number.isNaN(payloadFloat)){
                console.log('not a number');
              }else{
                let prevMLData = [...this.state.mLdata, payloadFloat];
                prevMLData.shift();
                this.setState({mLdata: prevMLData});
              }
              break;
            case 2:
              if(Number.isNaN(payloadFloat)){
                console.log('not a number');
              }else{
                let prevPresureData = [...this.state.presureData, payloadFloat];
                prevPresureData.shift();
                this.setState({presureData: prevPresureData});
              }
              break;
            case 3:
              if(Number.isNaN(payloadFloat)){
                console.log('not a number');
              }else{
                let prevBPMData = [...this.state.BPMdata, payloadFloat];
                prevBPMData.shift();
                this.setState({BPMdata: prevBPMData});
              }
              break;
          }
          this.setState({receivedData: ''});
        }
        
      }else{
        this.setState({receivedData: ''});
        this.setState({i: 0});
      } 

    }
  }

  onError(error) {
    console.error(error);
  }

  //const contentInset = {top: 20, bottom: 20};
  render() {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.line}>
              <Text style={styles.title}>Service:</Text>
              <Text style={styles.value}>
                {this.state.servisStarted ? 'Started' : 'Not Started'}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Usb:</Text>
              <Text style={styles.value}>
                {this.state.usbAttached ? 'Attached' : 'Not Attached'}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Connection:</Text>
              <Text style={styles.value}>
                {this.state.connected ? 'Connected' : 'Not Connected'}
              </Text>
            </View>
          </View>
          <View>
      
      <View
        style={{height: 100, flexDirection: 'row', backgroundColor: 'black'}}>
        <YAxis
          data={this.state.mLdata}
          contentInset={this.state.contentInset}
          svg={{
            fill: 'green',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}ºcm3`}
        />
        <LineChart
          style={{flex: 1, marginLeft: 16}}
          data={this.state.mLdata}
          svg={{stroke: 'green'}}
          curve={shape.curveNatural}
          contentInset={this.state.contentInset}>
          <Grid />
        </LineChart>
      </View>

      <View
        style={{height: 100, flexDirection: 'row', backgroundColor: 'black'}}>
        <YAxis
          data={this.state.presureData}
          contentInset={this.state.contentInset}
          svg={{
            fill: 'white',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}ºcm3`}
        />
        <LineChart
          style={{flex: 1, marginLeft: 16}}
          data={this.state.presureData}
          svg={{stroke: 'white'}}
          curve={shape.curveNatural}
          contentInset={this.state.contentInset}>
          <Grid />
        </LineChart>
      </View>
      
      <View
        style={{height: 100, flexDirection: 'row', backgroundColor: 'black'}}>
        <YAxis
          data={this.state.BMPdata}
          contentInset={this.state.contentInset}
          svg={{
            fill: 'red',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}ºcm3`}
        />
        <LineChart
          style={{flex: 1, marginLeft: 16}}
          data={this.state.BMPdata}
          svg={{stroke: 'red'}}
          curve={shape.curveNatural}
          contentInset={this.state.contentInset}>
          <Grid />
        </LineChart>
      </View>
      
    </View>
       
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  body: {
    // flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    //alignItems: "center"
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  line2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: 100,
  },
  value: {
    marginLeft: 20,
  },
  output: {
    marginTop: 10,
    height: 300,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 10,
    borderBottomWidth: 2,
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#147efb',
    borderRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default ManualConnection;
