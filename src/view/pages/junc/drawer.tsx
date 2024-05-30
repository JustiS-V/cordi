import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TerminalPage } from '../terminal';
import { View, Button } from 'react-native';
import { UsbDevicesPage } from '../usb_devices';
import { InfoPage } from '../info';
import { SettingsPage } from '../setttings';
  
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  
  return (
    <Drawer.Navigator 
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Home">
        <Drawer.Screen name="Info" component={InfoPage} />
        <Drawer.Screen 
         options={{
          
          // headerTitle: (props) => <LogoTitle {...props} />,
          // headerRight: () => (
          //   <Button
          //     onPress={() => {}}
          //     title="Info"
          //     color="red"
          //   />
          // ),
        }}
        name="Terminal" component={TerminalPage} />
        <Drawer.Screen name="Settings" component={SettingsPage} />
        <Drawer.Screen name="USB_Devices" component={UsbDevicesPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;