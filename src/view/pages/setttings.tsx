import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../redux/actions';


export const SettingsPage = () => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  
  const [formState, setFormState] = useState(settings);

  useEffect(() => {
    setFormState(settings);
  }, [settings]);

  const handleChange = (name, value) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    dispatch(updateSettings(formState));
    console.log('Form submitted:', formState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form with Four Inputs</Text>
      
      <View style={styles.inputGroup}>
        <Text>Baud Rate:</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={formState.baudRate}
          onChangeText={(value) => handleChange('baudRate', value)}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text>Parity:</Text>
        <Picker
          selectedValue={formState.parity}
          style={styles.picker}
          onValueChange={(value) => handleChange('parity', value)}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Even" value="Even" />
          <Picker.Item label="Odd" value="Odd" />
        </Picker>
      </View>
      
      <View style={styles.inputGroup}>
        <Text>Data Bits:</Text>
        <TextInput 
          style={styles.input}
          keyboardType="numeric"
          value={formState.dataBits}
          onChangeText={(value) => handleChange('dataBits', value)}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text>Stop Bits:</Text>
        <TextInput 
          style={styles.input}
          keyboardType="numeric"
          value={formState.stopBits}
          onChangeText={(value) => handleChange('stopBits', value)}
        />
      </View>
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});