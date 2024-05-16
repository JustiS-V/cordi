import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ConfigPage } from '../pages/config';
import { DevisesPage } from '../pages/devices';
import Terminal from '../terminal';
import { View, Button } from 'react-native';
import { UsbDevicesPage } from '../usb_devices';
import { InfoPage } from '../info';
import { SettingsPage } from '../setttings';
import TerminalPage from '../terminal';

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
  
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Terminal" component={TerminalPage} />
        <Drawer.Screen name="Settings" component={SettingsPage} />
        <Drawer.Screen name="USB_Devices" component={UsbDevicesPage} />
        <Drawer.Screen name="Info" component={InfoPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;