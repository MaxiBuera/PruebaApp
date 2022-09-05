import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/HomeScreen';
import { LoginScreen } from './src/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

// PASSWORD: pruebaapp

/*const navigation = useNavigation();*/
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName ='Login'>
          <Stack.Screen name = 'Login' component={LoginScreen} />
          <Stack.Screen name = 'Home' component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
