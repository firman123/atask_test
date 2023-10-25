import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from './src/screens/App';
import ListNote from './src/screens/ListNote';
import AddNote from './src/screens/AddNote';
import {RecoilRoot} from 'recoil';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={App}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListNote"
            component={ListNote}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default AppNavigator;
