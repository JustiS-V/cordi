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
import RNFS from '@dr.pogodin/react-native-fs';
const hex = require('string-hex');

export const TerminalPage = () => {
  const [usbSerial, setUsbSerial] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hexMessage, setHexMessage] = useState('');
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const handleSaveToFile = async () => {
    const path = RNFS.DocumentDirectoryPath + '/messages.txt';
    const fileContent = messages.join('\n');

    try {
      await RNFS.writeFile(path, fileContent, 'utf8');
      console.log('File saved successfully at:', path);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  };

  useEffect(() => {
    setHexMessage(hex(newMessage));
    // console.log(hex(newMessage));
  }, [newMessage]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newId = (messages.length + 1).toString();
    setMessages([{ text: newMessage }, ...messages]);
    setNewMessage('');
  };

  async function initSerialPort() {
    try {
      const devices = await UsbSerialManager.list();
      const granted = await UsbSerialManager.tryRequestPermission(devices[0].deviceId);
      console.log(usbSerial  + '1')
      if (granted) {
        try {
          const usbSerialport = await UsbSerialManager.open(devices[0].deviceId, {
            baudRate: parseInt(settings.baudRate),
            parity: Parity[settings.parity],
            dataBits: parseInt(settings.dataBits),
            stopBits: parseInt(settings.stopBits),
          });
          console.log(usbSerialport)
          setUsbSerial(usbSerialport);
        } catch (err) {
          // console.warn('Catch', err);
        }
      } else {
        console.log('USB permission denied');
      }
    } catch (err) {
      // console.error(err);
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
    
    return asciiString;
}

  const removeConnection = async () => {
    console.log(usbSerial  + '2')
    if (!!usbSerial){
      await usbSerial.close()
      await setUsbSerial(null)
    };
  };

  const handleReceivedData = async (event) => {
    setMessages((prevMessages) => [{ text: hexToAscii(event.data) }, ...prevMessages]);
  };


  useEffect(() => {
    if (usbSerial) {
      const sub = usbSerial.onReceived(handleReceivedData);
  
      return () => {
        if(!!usbSerial)
        sub.unsubscribe(); // Assuming there is a method to unsubscribe from the event
      };
    }
  }, [usbSerial]);

  async function sendData() {
    await usbSerial.send(hexMessage);
    sendMessage();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Terminal</Text>
        <View style={styles.buttons}>
          <Button title="Connect" onPress={()=>{
            if (!!usbSerial){
               removeConnection()
              }
            else{initSerialPort();}

            }} />
          <Button title="Save" onPress={handleSaveToFile} />
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          console.log(typeof item.text)
          return (
            <Text style={styles.message}>{item.text}</Text>
          )
        }
        }
        // keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Введите ваше сообщение..."
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
    color: 'black',
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
