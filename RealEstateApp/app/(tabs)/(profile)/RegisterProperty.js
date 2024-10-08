import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image,ScrollView  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { baseURL } from '../../../constants/baseURL'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';


const RegisterProperty = () => {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(null); // State to store user ID
  const [selectedImages, setSelectedImages] = useState([]); // State to store selected photos

  // Date picker state
  const [availableDate, setAvailableDate] = useState(new Date());

  // Lease term state
  const [leaseTerm, setLeaseTerm] = useState('');

  // Fetch user ID from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId); // Set the user ID in state
        } else {
          console.error('No user ID found in storage');
        }
      } catch (error) {
        console.error('Error retrieving user ID from storage:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || availableDate;
    setAvailableDate(currentDate);
  };

// Function to select photos
  const handlePhotoUpload = async () => {
    // Request permissions to access camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your photo library');
      return;
    }
  
    // Launch the image library to pick a photo
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple selections
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImages((prevImages) => [...prevImages, ...result.assets]); // Append selected images to the state
    }
  };

    // Function to remove a photo
    const removePhoto = (index) => {
      const updatedImages = [...selectedImages];
      updatedImages.splice(index, 1); // Remove the image at the given index
      setSelectedImages(updatedImages); // Update the state
    };

    const handleSubmit = async () => {
      console.log("Submitting property details...");
      
      if (!address || !price || !bedrooms || !bathrooms || !city || !state || !leaseTerm) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
      }
  
      if (!userId) {
          Alert.alert('Error', 'User is not signed in');
          return;
      }

          // Validate that at least one image is selected
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please upload at least one image');
      return;
  }
      
      console.log("Validation successful");
  
      // Prepare the listing data as a JSON object
      const listingData = {
          address: address.trim(),
          price: parseFloat(price),
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          city: city.trim(),
          state: state.trim(),
          availableDate: availableDate.toISOString(),
          leaseTerm: parseInt(leaseTerm),
          description: description.trim(),
          userId: userId,
          photoUrls: [] // Note the change from "photos" to "photoUrls"
      };
    
      console.log("Uploading photos...");
  
      // Create FormData
      const formData = new FormData();
      formData.append('listing', JSON.stringify(listingData)); // Send listing as a JSON part
  
      // Upload photos
      selectedImages.forEach((image, index) => {
          const uri = image.uri;
          const fileName = uri.split('/').pop();
          const type = image.type || 'image/jpeg';
  
          // Add each image as a FormData entry
          formData.append('photos', {
              uri,
              name: fileName,
              type, // Ensure you specify the correct mime-type
          });
      });
  
      console.log("Photos added to FormData");
  
      try {
          const response = await axios.post(`${baseURL}/listing/create`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
      
          // Handle successful response
          Alert.alert('Success', 'Property registered successfully!');
          console.log('Response from backend:', response.data);
    
          // Reset form fields
          setAddress('');
          setPrice('');
          setBedrooms('');
          setBathrooms('');
          setCity('');
          setState('');
          setLeaseTerm('');
          setDescription('');
          setAvailableDate(new Date());
          setSelectedImages([]);
  
      } catch (error) {
          console.error('Error:', error);
          if (error.response) {
              console.error('Backend Response:', error.response.data);
          }
          Alert.alert('Error', 'Failed to register property. Please try again.');
      }
  };

  return (
    <ScrollView>
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

  {/* Display selected images */}
  <View style={styles.imageRowContainer}>
    {selectedImages.map((image, index) => (
    <View key={index} style={styles.imageWrapper}>
      <Image source={{ uri: image.uri }} style={styles.image} />
      <TouchableOpacity style={styles.deleteIcon} onPress={() => removePhoto(index)}>
        <MaterialIcons name="delete-outline" size={24} color="#EDEDED" />
      </TouchableOpacity>
    </View>
  ))}

  {/* Button to Upload Photos */}
  <View style={styles.photoUploadSquareContainer}>
    <TouchableOpacity style={styles.photoUploadSquare} onPress={handlePhotoUpload}>
      <MaterialIcons name="add" size={50} color="#A3A3A3" />
    </TouchableOpacity>
  </View>
</View>

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
  imageRowContainer: {
    flexDirection: 'row',        // Align items in a row
    flexWrap: 'wrap',            // Wrap the row if it exceeds screen width
    justifyContent: 'flex-start',// Align the items to the left
  },
  imageWrapper: {
    position: 'relative',        // For positioning the delete icon
    margin: 10,                  // Margin around each image
    width: '26%',                // Set width to 30% for 3 items per row
    aspectRatio: 1,              // Maintain square ratio for the images
  },
  image: {
    width: '100%',               // Take full width of the wrapper
    height: '100%',              // Take full height of the wrapper
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',        // Positioning the delete icon on top-right
    top: -8,
    right: -8,
    backgroundColor: '#5C5C5C', // Light background for visibility
    borderRadius: 12,
  },
  photoUploadSquareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '30%',                // Match the width of the imageWrapper for alignment
    aspectRatio: 1,              // Keep the square ratio
  },
  photoUploadSquare: {
    width: '100%',               // Full width of the container
    height: '100%',              // Full height of the container
    borderWidth: 2,
    borderColor: '#A3A3A3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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



