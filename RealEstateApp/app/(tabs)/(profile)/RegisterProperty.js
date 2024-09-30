import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform,ScrollView  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const RegisterProperty = () => {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');


  // Date picker state
  const [availableDate, setAvailableDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);  // To show/hide date picker

  // Lease term state
  const [leaseTerm, setLeaseTerm] = useState('');


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || availableDate;
    setShowDatePicker(Platform.OS === 'ios'); // Keep date picker open for iOS, close for Android
    setAvailableDate(currentDate);
  };

  const handleSubmit = () => {
    // Log form data for now
    console.log('Property Details Submitted:');
    console.log('Address:', address);
    console.log('Price:', price);
    console.log('Bedrooms:', bedrooms);
    console.log('Bathrooms:', bathrooms);
    console.log('City:', city);
    console.log('State:', state);
    console.log('Available Date:', availableDate.toLocaleDateString());
    console.log('Lease Term:', leaseTerm);
    console.log('Description:', description);

    // Validate the fields
    if (!address || !price || !bedrooms || !bathrooms || !city || !state || !leaseTerm) {
        Alert.alert('Error', 'Please fill in all fields');
      } else {
        Alert.alert('Success', 'Property details captured successfully!');
        setAddress('');
        setPrice('');
        setBedrooms('');
        setBathrooms('');
        setCity('');
        setState('');
        setLeaseTerm('');
        setDescription('');
        setAvailableDate(new Date());
      }
    };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter property address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bedrooms</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of bedrooms"
        value={bedrooms}
        onChangeText={setBedrooms}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bathrooms</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of bathrooms"
        value={bathrooms}
        onChangeText={setBathrooms}
        keyboardType="numeric"
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter state"
        value={state}
        onChangeText={setState}
      />

       <View style={styles.rowContainer}>
       <Text style={styles.label}>Available Date</Text>
       <DateTimePicker
          value={availableDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
        </View>
    


      {/* Lease Term Dropdown */}
      <Text style={styles.label}>Lease Term</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select Lease Term (Months)', value: null }}
        onValueChange={(value) => setLeaseTerm(value)}
        items={[
          { label: '1 Month', value: '1' },
          { label: '2 Months', value: '2' },
          { label: '3 Months', value: '3' },
          { label: '4 Months', value: '4' },
          { label: '5 Months', value: '5' },
          { label: '6 Months', value: '6' },
          { label: '7 Months', value: '7' },
          { label: '8 Months', value: '8' },
          { label: '9 Months', value: '9' },
          { label: '10 Months', value: '10' },
          { label: '11 Months', value: '11' },
          { label: '12 Months + ', value: '12' },
        ]}
        style={pickerSelectStyles}
        value={leaseTerm}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter property description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Register My Property</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',  // Align items in a row 
    alignItems: 'center',  // Vertically center items
    justifyContent: 'space-between',  
    marginBottom: 15,  // Add space at the bottom
  },
  submitButton: {
    backgroundColor: '#007AFF', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', 
    height: 45, 
  },
  submitButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: 'black',
      marginBottom: 15,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: 'black',
      marginBottom: 15,
    },
  });

export default RegisterProperty;



