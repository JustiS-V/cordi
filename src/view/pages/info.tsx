import {
    Parity,
    UsbSerialManager,
  } from 'react-native-usb-serialport-for-android';
  import {ScrollView, Alert, Button, View, Text, StyleSheet} from 'react-native';
  import {useLayoutEffect, useState} from 'react';
  
  export const InfoPage = () => {
  
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.hightext}>
        Список команд для роботи з консолю
      </Text>
      <Text style={styles.text}>
        1. <Text style={styles.code}>CRS232E</Text>
      </Text>
      <Text style={styles.text}>
        2. <Text style={styles.code}>D|M----_|I----_|Z----_|N----_|E</Text>
      </Text>
      <Text style={styles.text}>
        3. <Text style={styles.code}>CSTARTE</Text>
      </Text>
      <Text style={styles.text}>
        4. <Text style={styles.code}>CALCULATE</Text>
      </Text>
      <Text style={styles.text}>
        5. <Text style={styles.code}>CSTOP_E</Text>
      </Text>

      <Text style={styles.hightext}>
        Системні команди консолі 
      </Text>
      <Text style={styles.text}>
        Команда "CALCULATE" повертає значення світло-суми.
      </Text>
      


      <Text  style={styles.hightext}>Загальні відомості</Text>
      <Text style={styles.text}>
        Формат параметрів, що передаються, має вигляд:
      </Text>
      <Text style={styles.code}>
        D|M----_|I----_|Z----_|N----_|E
      </Text>
      <Text style={styles.text}>
        Всі дані передаються в коді ASCII. Набір параметрів складається з 26-ти символів, починається з символу 'D' і закінчується символом 'E'.
      </Text>
      <Text style={styles.text}>
        D (0-а позиція вектора) – вказує на те, що будуть передаватися дані.
      </Text>
      <Text style={styles.text}>
        M (1-а позиція вектора) – передається час вимірювання. Задається в позиціях 2,3,4,5. 6-та позиція – пробіл.
      </Text>
      <Text style={styles.text}>
        I (7-а позиція вектора) – передається час імпульсу. Задається в позиціях 8,9,10,11 вектора. 12-та позиція – пробіл.
      </Text>
      <Text style={styles.text}>
        Z (13-а позиція вектора) – передається час паузи. Задається в позиціях 14,15,16,17 вектора. 18-та позиція – пробіл.
      </Text>
      <Text style={styles.text}>
        N (19-а позиція вектора) – передається кількість вимірювань. Задається в позиціях 20,21,22,23 вектора. 24-та позиція – пробіл.
      </Text>
      <Text style={styles.text}>
        E (31-а позиція вектора) – вказує на кінець вектора передачі даних.
      </Text>
      <Text style={styles.text}>
        Приклад пакету параметрів для вимірювання ОСЛ:
      </Text>
      <Text style={styles.code}>
        D|M0300_|I0005_|Z0005_|N0001_|E
      </Text>
    </ScrollView>
    );
  };
  

  
const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  hightext: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 8,
  },
  code: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
});