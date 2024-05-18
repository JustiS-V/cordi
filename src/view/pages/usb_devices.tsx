import {
    Parity,
    UsbSerialManager,
  } from 'react-native-usb-serialport-for-android';
  import {ScrollView, Alert, Button, View, Text, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
  import {useLayoutEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usbSerialAdd } from '../../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
  
  export const UsbDevicesPage = () => {
    const device = useSelector((state) => state.devices);
    const dispatch = useDispatch();
    const setUsb = (item) => {
        dispatch(usbSerialAdd(item))
    };
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
          setUsb(item)
        } else {
          Alert.alert('USB permission denied');
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    async function sendData(data) {
      Alert.alert('senddatafunc');
      if (usbSerial) {
        usbSerial
        .send(data)
        .then((e)=>{
          Alert.alert(e + 'then')
          })
        .catch((e)=>{
          Alert.alert(e + ' catch')
        })
      }
    }


const Item = ({name, id, connect}) => (
    <TouchableOpacity onPress={()=>{
      sendData('CRS232E');
    }} style={styles.item}>
      <View>
        <Text>{name}</Text>
        <Text>{id}</Text>
      </View>
      <View>
        <Text>Connect: </Text>
        <Text>{connect}</Text>
      </View>
    </TouchableOpacity >
  );

  
    return (
      <FlatList 
      data={[
        {
        name: '01',
        id: '0000',
        connect: false,
      },
      {
        name: '02',
        id: '0001',
        connect: false,
      },
      {
        name: '03',
        id: '0002',
        connect: false,
      },
    ]}
    renderItem={({item}) => <Item name={item.name} id={item.id} connect={item.connect} />}
    />
    );
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
    flexDirection: 'row',
    borderWidth: 1,

    //   backgroundColor: 'green',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });