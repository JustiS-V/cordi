import {
  Parity,
  UsbSerialManager,
} from 'react-native-usb-serialport-for-android';
import {
  Text,
  ScrollView,
  Alert,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {useLayoutEffect, useState} from 'react';

export const ConfigPage = () => {
  const [text, setText] = useState();

  const [usbSerial, setUsbSerial] = useState();
  // useLayoutEffect(() => {
  //   // initSerialPort();
  // }, []);

  async function initSerialPort() {
    try {
      // check for the available devices
      const devices = await UsbSerialManager.list();
      // Send request for the first available device
      const granted = await UsbSerialManager.tryRequestPermission(devices[0].deviceId);
      if (granted) {
        // open the port for communication
        const usbSerialport = await UsbSerialManager.open(devices[0].deviceId, { baudRate: 9600, parity: Parity.None, dataBits: 8, stopBits: 1 });
        console.log(usbSerialport)
        setUsbSerial(usbSerialport)
      } else {
        Alert.alert('USB permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  }

  // async function sendData(data) {
  //   if (usbSerial) {
  //     usbSerial
  //     .send(data)
  //     .then((e)=>{
  //         Alert.alert('then ' + e)

  //       })
  //     .catch((e)=>{
  //       Alert.alert('catch ' + e)
  //     })
  //   }
  // }

  async function requestUSBPermission() {
    try {
      const devices = await UsbSerialManager.list();
      // check for the available devices
      const granted = await UsbSerialManager.tryRequestPermission(
        devices[0].deviceId,
      );
      // Send request for the first available device
      if (granted) {
        Alert.alert('USB permission granted');
        // continue with connecting to the USB device
      } else {
        Alert.alert('USB permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <SafeAreaView>
      <View
        style={{width: '100%', height: 100, paddingHorizontal: 50, gap: 30}}>
        <TextInput
          style={{borderWidth: 1, borderColor: 'red'}}
          onChange={setText}
          value={text}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              setText('');
            }}>
            <Text>Clean</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              sendData(text);
            }}>
            <Text>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
