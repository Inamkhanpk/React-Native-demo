import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './../screens/SplashScreen';
import SignUpScreen from './../screens/SignUpScreen';
import NotificationScreen from './../screens/NotificationScreen';
import PhotoScreen from './../screens/PhotoScreen';
import TextScreen from './../screens/TextScreen';
import CalculatorScreen from './../screens/CalculatorScreen';
import ForgotPasswordScreen from './../screens/ForgotPasswordScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Notification') {
          iconName = focused
            ? 'bell'
            : 'bell';
        } else if (route.name === 'Photo') {
          iconName = focused ? 'camera' : 'camera';
        }
        else if (route.name === 'Text') {
          iconName = focused ? 'comment' : 'comment';
        }
        else if (route.name === 'Calculator') {
          iconName = focused ? 'calculator' : 'calculator';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen 
      name="Notification" 
      component={NotificationScreen}
       />
      <Tab.Screen name="Photo" component={PhotoScreen} />
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
    </Tab.Navigator>
  );
}

const   MainStackNavigator = () =>{
  return (
    
    <Stack.Navigator
    initialRouteName="SplashScreen"
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >

      <Stack.Screen 
        name="SplashScreen" 
        component={SplashScreen} 
        options={{headerShown: false}}
      />
        
      <Stack.Screen 
        name="SignUpScreen" 
        component={SignUpScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen} 
        options={{ title: 'Forgot Password' }}
      />
        <Stack.Screen 
        name="TabScreen" 
        component={BottomTabNavigator} 
        options={{headerShown: false}}
      />

      
     
    
    </Stack.Navigator>
  );
}




export  default MainStackNavigator   ;