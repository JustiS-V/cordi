import {
  Codes,
    Parity,
    UsbSerialManager,
  } from 'react-native-usb-serialport-for-android';
  import {ScrollView, Alert, Button, View, Text, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
  import {useLayoutEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usbSerialAdd } from '../../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
  
  export const UsbDevicesPage= () => {
    const [usbSerial, setUsbSerial] = useState(null)

    useLayoutEffect(()=>{
      // initSerialPort();
    },[]);

    async function initSerialPort() {
      try {
        const devices = await UsbSerialManager.list();
      
        const granted = await UsbSerialManager.tryRequestPermission(devices[0].deviceId);

        
        // unsubscribe
     
      
        // await usbSerialport.send('43525332333245');     
        // await usbSerialport.send('444d30313030204930303130205a30303130204e303030312045');
        // await sub.remove();
        // await usbSerialport.close();


        if (granted) {
          // open the port for communication
          try {
            const usbSerialport = await UsbSerialManager.open(devices[0].deviceId, { baudRate: 9600, parity: Parity.None, dataBits: 8, stopBits: 1 });

            const sub = await usbSerialport.onReceived((event) => {
          
              // console.log(event.deviceId, event.data);

              Alert.alert(`${event.deviceId} -  device id`, event.data)
            });
            setUsbSerial(usbSerialport);
          } catch  (err){
//@ts-ignore
            Alert.alert('Catch', err)
          }   
        } else {
          Alert.alert('USB permission denied');
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function sendData(xyi) {
     usbSerial.send(xyi)
      
    }

    

  //@ts-ignore
  const Item = ({name, id, connect}) => (
    <TouchableOpacity onPress={()=>{
      // sendData('CRS232E');
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
      <View style={{height: '100%'}}>
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

      </View>
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
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });