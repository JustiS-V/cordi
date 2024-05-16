import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

export const MainPage = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', width: width, height: height * 0.5}}>
        <TouchableOpacity>
          <View
            style={{
              width: width * 0.5,
              height: height * 0.5,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Main</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>{navigation.navigate('Devises')}}>
          <View
            style={{
              width: width * 0.5,
              height: height * 0.5,
              backgroundColor: 'yellow',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Devices</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', width: width, }}>
        <TouchableOpacity
         onPress={()=>{navigation.navigate('Config')}}>
          <View
            style={{
              width: width * 0.5,
              height: height * 0.5,
              backgroundColor: 'purple',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Config</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>{navigation.navigate('Log')}}>
          <View
            style={{
              width: width * 0.5,
              height: height * 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Log</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
