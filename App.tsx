// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoReducer from './src/redux/reducers';
import TodoList from './src/view/components/TodoList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogPage } from './src/view/pages/junc/log';
import { DevisesPage } from './src/view/pages/junc/devices';
import { MainPage } from './src/view/pages/junc/main';
import { ConfigPage } from './src/view/pages/junc/config';
import MyDrawer from './src/view/pages/junc/drawer';


const Stack = createNativeStackNavigator();
const store = createStore(todoReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
