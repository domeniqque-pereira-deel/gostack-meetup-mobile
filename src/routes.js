/* eslint-disable react/prop-types */
import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import logo from '~/assets/logo.png';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const Sign = createSwitchNavigator({
  SignIn,
  SignUp,
});

const headerConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTitle: <Image source={logo} />,
    headerTitleStyle: {
      fontSize: 18,
    },
    headerStyle: {
      backgroundColor: '#191720',
      borderBottomColor: 'transparent',
      height: 64,
    },
  },
};

const App = createBottomTabNavigator(
  {
    Dashboard: {
      screen: createStackNavigator(
        {
          Dashboard,
        },
        headerConfig
      ),
      navigationOptions: {
        tabBarLabel: 'Meetups',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="format-list-bulleted" size={20} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: createStackNavigator(
        {
          Profile,
        },
        headerConfig
      ),
      navigationOptions: {
        tabBarLabel: 'Meu perfil',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      // keyboardHidesTabBar: true,
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      style: {
        backgroundColor: '#2B1A2F',
        height: 55,
        borderTopColor: 'transparent',
      },
      tabStyle: {
        paddingTop: 5,
        paddingBottom: 5,
      },
    },
  }
);

export default function createRoute(isSigned = false) {
  return createAppContainer(
    createSwitchNavigator(
      {
        Sign,
        App,
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
}
