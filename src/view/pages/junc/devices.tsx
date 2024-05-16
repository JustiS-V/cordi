import {
  Parity,
  UsbSerialManager,
} from 'react-native-usb-serialport-for-android';
import {ScrollView, Alert, Button, View} from 'react-native';
import {useLayoutEffect, useState} from 'react';

export const DevisesPage = () => {
  const [usbSerial, setUsbSerial] = useState();
  useLayoutEffect(() => {
    initSerialPort();
  }, []);

  async function initSerialPort() {
    try {
      // check for the available devices
      const devices = await UsbSerialManager.list();
      // Send request for the first available device
      const granted = await UsbSerialManager.tryRequestPermission(devices[0].deviceId);
      if (granted) {
        // open the port for communication
        const usbSerialport = await UsbSerialManager.open(devices[0].deviceId, { baudRate: 9600, parity: Parity.None, dataBits: 8, stopBits: 1 });
        setUsbSerial(usbSerialport)
      } else {
        Alert.alert('USB permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function sendData(data) {
    console.log('qqqqq')
    if (usbSerial) {
      usbSerial
      .send(data)
      .then((e)=>{
          console.log(e)
          console.log('then')
        })
      .catch((e)=>{
        console.log(e + ' catch')
      })
    }
  }

  return (
    <>
      <ScrollView>
        <Button
          onPress={() => {
            Alert.alert('idi nahyi ');
          }}
          title="ON"
        />
        <Button onPress={() => sendData('0x02')} title="OFF" />
      </ScrollView>
    </>
  );
};
