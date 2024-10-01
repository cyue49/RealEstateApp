import { StatusBar } from "expo-status-bar";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react"; 
import axios from 'axios';

import { baseURL } from '../../constants/baseURL'
//import { styles } from "../../constants/commonStyles";


export default function SignUp() {
   // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');  
  const [phoneNumber, setPhoneNumber] = useState('');  
  const [address, setAddress] = useState(''); 
  const [error, setError] = useState('');

  const goToSignin = () => {
    router.replace("/signin");
  };

  const handleSignUp = async () => {
    try {

        const user = {
          email: email.trim(),
          password: password.trim(),
          userName: userName.trim(),
          phoneNumber: phoneNumber.trim(),
          address: address.trim()
        };
    
        const response = await axios.post(

          `${baseURL}/user/create`,

          user 
        );
    
        // Handle successful sign-up (navigate to home screen)

        console.log('Sign-Up successful:', response.data);
        goToSignin(); 
    
      } catch (error) {
        console.error('Error:', error);
    
        if (error.response) {
          setError(error.response.data || 'Sign-up failed');
        } else if (error.request) {
          setError('No response from server. Check your network.');
        } else {
          setError('Error in Sign-up request.');
        }
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
    
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignin}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff007a',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#ff007a',
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
