import  React,{useEffect, useState} from 'react';
import {View,StyleSheet ,Image,Button,PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';


const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  
};




function PhotoScreen() {
    const [ImageUri,setImageUri] = useState("")
    const [backImage,setbackImage] = useState("")
    const [pic,setPic] = useState(false)




useEffect(()=>{
  const getImage = async () =>{
  const url = await storage().ref('images/').getDownloadURL();
  console.log(url)
  setbackImage(url)
  setPic(false)
  }
  getImage()
},[pic])




    const open_picker = () => {

      launchCamera(options, (response) => {
        console.log('Response = ', response);
  
        const uri = response.assets[0].uri;
  
        setImageUri(uri)
        let reference = storage().ref("/images");         // 2
   let task = reference.putFile(uri);               // 3

   task.then(() => {                                 // 4
       console.log('Image uploaded to the bucket!');
       setPic(true)
   }).catch((e) => console.log('uploading image error => ', e));
      });

    

 
    
  }
   
    


    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          open_picker() 
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

  
    return (
      <View style={styles.container}>
        <Image
            source={{ uri: backImage ? backImage : null }}
            alt="image photo"
            style={ styles.imageStyle }
          />
         
        <Button onPress={requestCameraPermission}  title="Select From Gallery " />
       
       
       
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
     },
    imageStyle:{
      width: 200,
       height: 200 ,
       marginBottom:10
    }
  });


  export default PhotoScreen