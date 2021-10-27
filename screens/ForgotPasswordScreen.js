import React,{useState} from 'react'
import { Text, View,TextInput,Button ,StyleSheet, Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import { isEmpty ,isEmail } from "validator";
import { useNavigation } from '@react-navigation/native';

function ForgotPassword() {
  const navigation = useNavigation(); 
    const [state, setState] = useState({
        email: '',
      
        })
        const [errors, setErrors] = useState({
         
          email: '',
          
          
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
        

        const validateForm = () => {
          let {  email } = state;
          let errors = {  email: ""};
          let valid = true;
        
          if (isEmpty(email) || !isEmail(email)) {
        
            errors.email = "Please provide a valid email address";
            valid = false;
          }
        
         
          
          setErrors(errors);
        
          return valid;
        };
    const handlePasswordReset =  () => {
        
      
       
          if (validateForm()) {
           auth().sendPasswordResetEmail(state.email)
           .then(function (user) {
             console.log(user)
            Alert.alert('Password reset email sent successfully')
            navigation.navigate('SignUpScreen')
          }).catch(function (e) {
            console.log(e)
          })
         
         
        }
        else {
          setvalidateOnChange(true);
   
        }
      
     
      }
    return (
      <View style={styles.container}>
       <View style={styles.btns}>
         <Text style={styles.textValue}>Reset Password</Text>
        <TextInput
       style={styles.input}
        onChangeText={(val)=>emailChange(val)}
        keyboardType="email-address"
        value={state.email}
        placeholder="Email"
      />
       <Text  style={styles.errors}>{errors.email ? errors.email : null}</Text>
      <Button
  title="Send Email"
  onPress={handlePasswordReset}
 
/>
</View>
      </View>
    )
  
}


const styles = StyleSheet.create({
  input: {
    // height: 40,
     marginBottom: 12,
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
     //backgroundColor: '#006600',
     backgroundColor:'#307ecc'
  },
  btns:{
    margin:10,
   
  },
  textValue:{
    textAlign:'center', 
    fontWeight:'bold' ,
    fontSize:28,
    color:'black'
  }
});

export default ForgotPassword