import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DeviceEventEmitter,
  Button,
} from 'react-native';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
//type Props = {};
class ManualConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servisStarted: false,
      connected: false,
      usbAttached: false,
      output: '',
      outputArray: [],
      baudRate: '115200',
      interface: '-1',
      sendText: 'HELLO',
      returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING,
      receivedData: '',
      data: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99,
        100,
        99,
        98,
        97,
        96,
        95,
        94,
        93,
        92,
        91,
        90,
        89,
        88,
        87,
        86,
        85,
        84,
        83,
        82,
        81,
        80,
        79,
        78,
        77,
        76,
        75,
        74,
        73,
        72,
        71,
        70,
        69,
        68,
        67,
        66,
        65,
        64,
        63,
        62,
        61,
        60,
        59,
        58,
        57,
        56,
        55,
        54,
        53,
        52,
        51,
        50,
        49,
        48,
        47,
        46,
        45,
        44,
        43,
        42,
        41,
        40,
        39,
        38,
        37,
        36,
        35,
        34,
        33,
        32,
        31,
        30,
        29,
        28,
        27,
        26,
        25,
        24,
        23,
        22,
        21,
        20,
        19,
        18,
        17,
        16,
        15,
        14,
        13,
        12,
        11,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
      ],
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
      if (!testStr) {
        this.state.receivedData = this.state.receivedData + payload;
      } else {
        this.state.receivedData = this.state.receivedData + payload;
        this.setState({output: this.state.receivedData});

        const payloadFloat = parseFloat(this.state.receivedData);
        if (Number.isNaN(payloadFloat)) {
          console.log('not a number');
        } else {
          let prevData = [...this.state.data, payloadFloat];
          prevData.shift();
          this.setState({data: prevData});
        }

        this.setState({receivedData: ''});
      }

      // let val = this.state.data[this.state.data.length - 1];
      // val === 50 ? (val = 0) : (val = 50);
    }
  }

  onError(error) {
    console.error(error);
  }

  handleConvertButton() {
    let data = '';
    if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
    ) {
      data = RNSerialport.hexToUtf16(this.state.output);
    } else if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
    ) {
      data = RNSerialport.intArrayToUtf16(this.state.outputArray);
    } else {
      return;
    }
    this.setState({output: data});
  }

  handleClearButton() {
    this.setState({output: ''});
    this.setState({outputArray: []});
  }

  buttonStyle = (status) => {
    return status
      ? styles.button
      : Object.assign({}, styles.button, {backgroundColor: '#C0C0C0'});
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        <View>
          <View
            style={{
              height: 100,
              flexDirection: 'row',
              backgroundColor: 'black',
            }}>
            <YAxis
              data={this.state.data}
              contentInset={{top: 20, bottom: 20}}
              svg={{
                fill: 'green',
                fontSize: 10,
              }}
              numberOfTicks={5}
              formatLabel={(value) => `${value}ºcm3`}
            />
            <LineChart
              style={{flex: 1, marginLeft: 16}}
              data={this.state.data}
              svg={{stroke: 'green'}}
              // curve={shape.curveNatural}
              contentInset={{top: 20, bottom: 20}}>
              <Grid />
            </LineChart>
          </View>
        </View>
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
          <ScrollView style={styles.output} nestedScrollEnabled={true}>
            <Text style={styles.full}>
              {this.state.output === '' ? 'No Content' : this.state.output}
            </Text>
          </ScrollView>

          <View style={styles.inputContainer}>
            <Text>Send</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({sendText: text})}
              value={this.state.sendText}
              placeholder={'Send Text'}
            />
          </View>
          <View style={styles.line2}>
            <TouchableOpacity
              style={this.buttonStyle(this.state.connected)}
              onPress={() => this.handleSendButton()}
              disabled={!this.state.connected}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleClearButton()}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleConvertButton()}>
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
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
