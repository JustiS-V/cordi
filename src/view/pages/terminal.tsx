// Terminal.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';

const TerminalPage = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: "Привет!" },
        { id: '2', text: "Как дела?" },
        { id: '3', text: "Что нового?" },
        { id: '4', text: "Будешь на концерте завтра?" },
      ]);
      const [newMessage, setNewMessage] = useState('');
    
      const sendMessage = () => {
        if (newMessage.trim() === '') return;
        const newId = (messages.length + 1).toString();
        setMessages([{ id: newId, text: newMessage }, ...messages, ]);
        setNewMessage('');
      };
    
  return (
    <View style={styles.container}>
        <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.text}</Text>
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Введите ваше сообщение..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    messagesContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      padding: 20,
    },
    message: {
      backgroundColor: '#e0e0e0',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
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
  });
  

export default TerminalPage;
