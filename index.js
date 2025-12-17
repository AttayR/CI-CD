import {AppRegistry} from 'react-native';
import App from './src/App';

// In our Android MainActivity we return "main" as the JS entry component.
// Register that same name here so React Native can start the app correctly.
AppRegistry.registerComponent('main', () => App);
