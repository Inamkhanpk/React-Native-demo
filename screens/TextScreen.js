import  React,{useEffect,useState} from 'react';
import {  Text, View ,TextInput,FlatList,Button,StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { isEmpty  } from "validator";

function TextScreen() {
    const [state,setState] = useState({
      textwrite:''
    })
     const [resultText,setResulttext] =useState([])
    const [textSave,setTextSave] = useState(false)
    const [errors, setErrors] = useState({
         
      textwrite:""
      
    })
    const [validateOnChange, setvalidateOnChange] = useState(false)
    
    useEffect(() => {
      const list = [];
      const subscriber = async ( ) => {
       await firestore()
       .collection('Users')
       .get()
       .then(querySnapshot => {
      

        
        querySnapshot.forEach(documentSnapshot => {
          const { text } = documentSnapshot.data();
          list.push(text);
         
          setResulttext(list)
        });
        
        setTextSave(false)
      });
       }
        subscriber()
      }, [textSave])
      
     
    const textChange=(val)=>{
        //console.log(val)
        setState({
          ...state,
            textwrite:val
        })
        if (validateOnChange) {
          validateForm();
        }
        
    };

    const validateForm = () => {
      let {  textwrite } = state;
      let errors = { textwrite: ""};
      let valid = true;
    
      if (isEmpty(textwrite)) {
    
        errors.textwrite = "Please Enter Any Text";
        valid = false;
      }
    
      
    
      
      setErrors(errors);
    
      return valid;
    };


    const renderItem = ({item,index} ) => {
      //console.log("item:,",item)
      // resultText.forEach(documentSnapshot => {
      //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      // });
        return(
          <View style={{flex:1,justifyContent:"center" ,alignItems:'center' ,backgroundColor:'white' ,borderRadius:50 ,margin:10}}>
         <Text style={{fontSize:28}}>{item}</Text>
         </View>
        )
    };

    const handleSubmit = () => {
      if (validateForm()) {
        firestore()
        .collection('Users')
        .add({
          text: state.textwrite,
          
        })
        .then(() => {
          console.log('Text added!'); 
          setTextSave(true)
        });
      }
      else {
        setvalidateOnChange(true);
 
      }
    }

   // console.log("resultText",resultText)
    return (
      <View style={styles.container}>
        <View style={styles.main}>
      
        <TextInput
        style={styles.input}
        onChangeText={(val)=>textChange(val)}
        keyboardType="default"
        value={state.textwrite}
        placeholder="Text Written"
      />
      <Text  style={styles.errors}>{errors.textwrite ? errors.textwrite : null}</Text>

      <View style={{marginTop:10}}>
      <Button 
      title="Submit"
      onPress={handleSubmit}/>
    </View>

    
       

      
     </View>

<View>
     <FlatList
        data={resultText}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container:{
    flex: 1,
      
    // alignItems: 'center',
     justifyContent: 'center',
     //backgroundColor: '#006600',
     backgroundColor:'#307ecc'
  },
  main:{
    margin :10
  },
  errors:{
    color:'red'
  },
  input: {
    // height: 40,
     marginTop: 12,
    borderWidth: 1,
    // padding: 10,
    borderRadius:50,
    color:'white'
  },
    
  });

  export default TextScreen