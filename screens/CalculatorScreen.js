import React, { useState,useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
//import Geocoder from 'react-native-geocoding';
import { Picker } from '@react-native-picker/picker';
import { isEmpty } from "validator";
//import RangeSlider from 'rn-range-slider';
//import MapView from 'react-native-maps';

function CalculatorScreen() {
  const [pickerValue, setPickerValue] = useState('')
  const [result, setResult] = useState("")
  const [state, setState] = useState({
    number1: '',
    number2: '',
    
  })
  // const [low,setLow] = useState('')
  // const [high,setHigh] = useState('')
  const [errors, setErrors] = useState({

    number1: '',
    number2: ''

  })
  const [validateOnChange, setvalidateOnChange] = useState(false)

  const textChange1 = (val) => {
    console.log(val)
    setState({
      ...state,
      number1: val
    })
    if (validateOnChange) {
      validateForm();
    }

  };

  const textChange2 = (val) => {
    console.log(val)
    setState({
      ...state,
      number2: val
    })
    if (validateOnChange) {
      validateForm();
    }

  };

  const validateForm = () => {
    let { number1, number2 } = state;
    let errors = { number1: "", number2: "" };
    let valid = true;

    if (isEmpty(number1)) {

      errors.number1 = "Please Enter Number 1";
      valid = false;
    }

    if (isEmpty(number2)) {
      errors.number2 = "Passowrd Enter Number 2";
      valid = false;
    }


    setErrors(errors);

    return valid;
  };


  function plus(a, b) {
    return a + b
  }

  function minus(a, b) {
    return (a - b);
  }

  function multiply(a, b) {
    return (a * b);
  }


  const handleSubmit = () => {
    console.log("state.number1,state.number1,pickerValue", state.number1, state.number2, pickerValue)

    if (validateForm()) {

      switch (pickerValue) {
        case "Add":
          const add = plus(parseInt(state.number1), parseInt(state.number2))
          setResult(add)
          break;
        case "Subtract":
          const subtract = minus(state.number1, state.number2)
          setResult(subtract)
          break;
        case "Multiply":
          const multiple = multiply(state.number1, state.number2)
          setResult(multiple)
          break;
        default:
          text = "Looking forward to the Weekend";
      }

      // axios.post("http://10.0.2.2:5001/demoproject-ac635/us-central1/helloWorld",values)
      // .then((getvalue)=>{
      //   console.log(getvalue)
      //   setResult(getvalue)
      // })
      // .catch((err)=>{
      //   console.log(err)
      // })

      // functions().useFunctionsEmulator("http://192.168.18.114:5001/demoproject-ac635/us-central1/helloWorld")
      // const response = await functions().httpsCallable("helloWorld")();
      //console.log("response", response);
    }
    else {
      setvalidateOnChange(true);

    }


  }

  // const renderThumb = useCallback(() => <Thumb/>, []);
  // const renderRail = useCallback(() => <Rail/>, []);
  // const renderRailSelected = useCallback(() => <RailSelected/>, []);
  // const renderLabel = useCallback(value => <Label text={value}/>, []);
  // const renderNotch = useCallback(() => <Notch/>, []);
  // const handleValueChange = useCallback((low, high) => {
  //   setLow(low);
  //   setHigh(high);
  // }, []);
  //Geocoder.init("AIzaSyBgrty9rA8YwTBX3dUZaEzslpx3LcGlNTY");

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          onChangeText={(val) => textChange1(val)}
          keyboardType="numeric"
          value={state.number1}
          placeholder="Number 1"
        />

{/* <RangeSlider
    style={styles.slider}
    min={0}
    max={100}
    step={1}
    floatingLabel
    renderThumb={renderThumb}
    renderRail={renderRail}
    renderRailSelected={renderRailSelected}
    renderLabel={renderLabel}
    renderNotch={renderNotch}
    low={low}
    high={high}
    onValueChanged={handleValueChange}
  /> */}
        <Text style={styles.errors}>{errors.number1 ? errors.number1 : null}</Text>

        <TextInput
          style={styles.input}
          onChangeText={(val) => textChange2(val)}
          keyboardType="numeric"
          value={state.number2}
          placeholder="Number 2"
        />
        <Text style={styles.errors}>{errors.number2 ? errors.number2 : null}</Text>

        <Picker
          selectedValue={pickerValue}
          onValueChange={(itemValue, itemIndex) =>
            setPickerValue(itemValue)
          }>
          <Picker.Item label="Select Operator" value="operator" />
          <Picker.Item label="Add" value="Add" />
          <Picker.Item label="Subtract" value="Subtract" />
          <Picker.Item label="Multiply" value="Multiply" />
        </Picker>

        <Button
          title="Calculate"
          onPress={handleSubmit}
        />
      </View>
      <View >
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Answer :{result ? result : null}</Text>
      </View>

      {/* <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  /> */}
      {/* {Geocoder.from("Colosseum")
		.then(json => {
		//	var location = json.results[0].geometry.location;
			console.log(json);
		})
		.catch(error => console.warn(error))} */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#006600',
    backgroundColor: '#307ecc'
  },
  main: {
    margin: 10
  },
  input: {
    // height: 40,
    marginTop: 12,
    borderWidth: 1,
    // padding: 10,
    borderRadius: 50,
    color: 'white'
  },
  errors: {
    color: 'red'
  }


});

export default CalculatorScreen