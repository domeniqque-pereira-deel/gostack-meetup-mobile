import { AppRegistry, YellowBox } from 'react-native';

import { name as appName } from './app.json';
import App from './src';

YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]`']);

AppRegistry.registerComponent(appName, () => App);
