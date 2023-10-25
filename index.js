/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigator from './AppNavigator';

AppRegistry.registerComponent(appName, () => AppNavigator);
