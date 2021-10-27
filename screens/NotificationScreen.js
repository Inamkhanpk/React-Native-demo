import  React from 'react';
import { View,Button,StyleSheet} from 'react-native';

import {LocalNotification} from './../services/LocalPushController'



function NotificationScreen() {

  
  const handleButtonPress = () => {
          LocalNotification()
        }

        
    
    return (
      <View style={styles.container}>
        <Button title={'Push Notification'} onPress={handleButtonPress} color='#ff0000' />
      </View>
    );
  }

  const styles = StyleSheet.create({
   container:{
    flex: 1,
     justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor :"#006600"
      backgroundColor:'#307ecc'
   }

   
  });


  export default NotificationScreen