import React,{useState} from 'react';
import {  Text, View ,StyleSheet, TextInput,Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { isEmpty ,isEmail } from "validator";


function SignUpScreen() {
    const navigation = useNavigation(); 
    const [state, setState] = useState({
        email: '',
        password: '',
        })
        const [errors, setErrors] = useState({
         email: '',
          password: '',
          })
        const [validateOnChange, setvalidateOnChange] = useState(false)

      const emailChange=(val)=>{
        console.log(val)
        setState({
            ...state,
            email:val
        })
        if (validateOnChange) {
          validateForm();
        }
    };
    
    const passwordChange=(val)=>{
      console.log(val)
      setState({
          ...state,
          password:val
      })
      if (validateOnChange) {
        validateForm();
      }
    };
    

    const handleSubmit = () => {
        console.log("handle")
     
      if (validateForm()) {
        
          auth()
          .createUserWithEmailAndPassword(state.email,state.password )
          .then(() => {
            console.log('User account created & signed in!');
            navigation.replace('TabScreen')
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('That email address is already in use!');
              navigation.navigate("SignUpScreen")
            }
        
            if (error.code === 'auth/invalid-email') {
              Alert.alert('That email address is invalid!');
              navigation.navigate("SignUpScreen")
            }
        
            console.error(error);
          });

          //navigation.replace('TabScreen')
         
         }
         else {
           setvalidateOnChange(true);
    
         }
    };
    
    const goToForgotPassword = () => navigation.navigate('ForgotPasswordScreen')


    const validateForm = () => {
        let {  email, password } = state;
        let errors = {  email: "", password: ""};
        let valid = true;
      
        if (isEmpty(email) || !isEmail(email)) {
      
          errors.email = "Please provide a valid email address";
          valid = false;
        }
      
        if (isEmpty(password) || password.length < 8) {
          errors.password = "Passowrd should be at least 8 characters long";
          valid = false;
        }
      
        
        setErrors(errors);
      
        return valid;
      };

    return (
      <View  style={styles.container}>

        <View style={{margin:10}}>
        <Text style={styles.textValue}>Sign Up</Text>
       
        <TextInput
        style={styles.input}
        onChangeText={(val)=>emailChange(val)}
        keyboardType="email-address"
        value={state.email}
        placeholder="Email"
      />
       <Text  style={styles.errors}>{errors.email ? errors.email : null}</Text>

      <TextInput
      style={styles.input}
      onChangeText={(val)=>passwordChange(val)}
      secureTextEntry={true}
      keyboardType="default"
      value={state.password}
      placeholder="Password"
      />
       <Text  style={styles.errors}>{errors.password ? errors.password : null}</Text>


       <View  style={styles.btns}>
       <Button onPress={handleSubmit}
        title="SignUp"
        
        />
        </View>
<View style={styles.btns}>
<Button
  title="Forgot Password?"
  onPress={goToForgotPassword}
 
 
/>
</View>


        </View>

      </View>
    );
  }


  const styles = StyleSheet.create({
    input: {
      // height: 40,
      // margin: 12,
      borderWidth: 1,
      // padding: 10,
      borderRadius:50,
      color:'white'
    },
    errors:{
      color:'red'
    },
    container: {
      flex: 1,
      
      // alignItems: 'center',
       justifyContent: 'center',
      // backgroundColor: '#006600',
      backgroundColor:'#307ecc'
    },
    btns:{
      marginTop:10,
     
    },
    textValue:{
      textAlign:'center', 
      fontWeight:'bold' ,
      fontSize:28,
      color:'black'
    }
  });

  export default SignUpScreen