import {
  Codes,
  Parity,
  UsbSerialManager,
} from 'react-native-usb-serialport-for-android';
import {
  ScrollView,
  Alert,
  Button,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usbSerialAdd } from '../../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';

// import RNFS from '@dr.pogodin/react-native-fs';

import moment from 'moment';
const hex = require('string-hex');
// const RNFS = require('react-native-fs');

export const TerminalPage = () => {
  const [usbSerial, setUsbSerial] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hexMessage, setHexMessage] = useState('');
  const [permission, setPermission] = useState(false)
  const [deviceList, setDeviceList] = useState([]); 
  const [intermediateMessage, setIntermediateMessage] = useState('');
  const timerRef = useRef(null);
  const settings = useSelector(state => state.settings);
  function messArrToString(messagesArr) {
    return messagesArr.map(obj => `${obj.date.toISOString()} - ${obj.text}`).join('\n');
  }

  const handleSaveToFile = async () => {
    const path = RNFS.DownloadDirectoryPath + `/${Math.floor(Date.now() / 1000).toString()}.txt`;

    RNFS.writeFile(path, messArrToString(messages), 'utf8')
  .then((success) => {
    Alert.alert('FILE WRITTEN!', `Path: ${path}`);
    
  })
  .catch((err) => {
    console.log(err.message);
  });
    // console.log(fileContent)
    // try {
    //   await RNFS.writeFile(path, fileContent, 'utf8');
    //   console.log('File saved successfully at:', path);
    // } catch (error) {
    //   console.error('Failed to save file:', error);
    // }
  };

  useEffect(() => {
    setHexMessage(hex(newMessage));

  }, [newMessage]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newId = (messages.length + 1).toString();
    setMessages([{ text: newMessage, date: new Date() }, ...messages]);
    setNewMessage('');
  };

  useEffect(()=>{
    getDeviceList();
  },[])



  async function getDeviceList () {
    await UsbSerialManager.list().then((event)=>{
      console.log(event)
      setDeviceList(event)
    }).catch((e)=>{console.log(e + ' device list')})
  }



  async function getPerm() {
    console.log('qweqweqwe')
    console.log(deviceList.length )
    if(deviceList.length >0){ 
      // getPerm();
      console.log('devicelnght')
    
    await UsbSerialManager.tryRequestPermission(deviceList[0].deviceId).then(
      (event)=>{
        setPermission(true);
        console.log(event + 'requestPerm true')
      }).catch((err)=>{ console.log(err +  'requestPerm catch')

      getDeviceList();
      })
    } else {
      Alert.alert('Device not found');
      getDeviceList();
    }
  }

  async function initSerialPort() {
   
      if (permission) {
        try {

          const usbSerialport = await UsbSerialManager.open(deviceList[0].deviceId, {
            baudRate: parseInt(settings.baudRate),
            parity: Parity[settings.parity],
            dataBits: parseInt(settings.dataBits),
            stopBits: parseInt(settings.stopBits),
          });
          console.log(usbSerialport)
          setUsbSerial(usbSerialport);
        } catch (err) {
          console.log('init serial port error')
        }
      } else {
        getPerm();
      }
  }

  function hexToAscii(hexString) {

    console.log(hexString)
    if (hexString.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }

    let asciiString = '';
    
    for (let i = 0; i < hexString.length; i += 2) {
        let hexPair = hexString.substr(i, 2);
        let decimalValue = parseInt(hexPair, 16);
        asciiString += String.fromCharCode(decimalValue);
    }
    console.log(asciiString)
    //add check all string 00000000
    console.log('asciiString')
    return asciiString;
}

  const removeConnection = async () => {
    if (!!usbSerial){
      await usbSerial.close()
      await setUsbSerial(null)
      Alert.alert('Connect lost', 'The devise is disconnected')
    };
  };

  


  function calcuvateValue() {

  }


  useEffect(() => {
    if (usbSerial) {
      const sub = usbSerial.onReceived(handleReceivedData);
  
      // return () => {
      //   if(!!usbSerial)
      //   sub.unsubscribe(); // Assuming there is a method to unsubscribe from the event
      // };
    }
  }, [usbSerial]);

  // const handleReceivedData = async (event) => {
  //   setMessages((prevMessages) => [{ text: hexToAscii(event.data), date: new Date() }, ...prevMessages]);
  // };

  const handleReceivedData = (event) => {
    const receivedData = hexToAscii(event.data);
    setIntermediateMessage((prev) => {
      const newMessage = prev ? `${prev} ${receivedData}` : receivedData;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setMessages((prevMessages) => [{ text: newMessage, date: new Date() }, ...prevMessages]);
        setIntermediateMessage('');
        timerRef.current = null; 
      }, 3000);

      return newMessage;
    });
  };


  async function sendData() {
    // setTimer 3sec
    if (newMessage == 'CALCULATE') return Alert.alert('Calculate', 'Calculate func');
    // if (newMessage == 'Якась там команда старт') return Alert.alert('Calculate', 'Calculate func');
    
    await usbSerial.send(hexMessage);
    sendMessage();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Terminal</Text>
        <View style={styles.buttons}>
          <Button title={!!!usbSerial ? 'Connect' : 'Disconnect'} onPress={()=>{
            if (!!usbSerial){
               removeConnection()
              }
            else{
              initSerialPort();}
            }} />
          <Button title="Save" onPress={handleSaveToFile} />
          <Button title="Clean" onPress={()=>{setMessages([])}} />
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          return (
            <View style={[styles.message,{flexDirection: 'row'}]}>
              <Text style={{color:'black'}}>{moment(item.date).format()}</Text>
              <Text style={{color:'black', paddingLeft: 10,}}>{item.text}</Text>
            </View>
          )
        }
        }
        // keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Введіть команду..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendData}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  inputField: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});
