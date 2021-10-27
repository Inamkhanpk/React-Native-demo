import React, { useEffect} from 'react';
import {ActivityIndicator,View,StyleSheet,Image } from 'react-native';
import logo from './../assets/logo.png'


const SplashScreen = ({navigation}) => {
  
useEffect(() => {
    setTimeout(() => {
     navigation.replace('SignUpScreen')
    }, 5000);
  }, []);




  return (
    <View style={styles.container}>
     
      <Image
        source={logo}
        style={{width: '100%', resizeMode: 'contain', }}
      />
     
      <ActivityIndicator
       
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
   height: 'auto',
  },
});