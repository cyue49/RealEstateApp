import { StatusBar } from "expo-status-bar";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react"; 
import axios from 'axios';
//import { styles } from "../../constants/commonStyles";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


export default function SignIn() {
   // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const goToHome = () => {
    router.replace("/listings");
  };

  const goToSignup = () => {
    router.replace("/signup");
  };

  const handleSignIn = async () => {
    try {
        // Replace with your backend URL
        const response = await axios.post('http://127.0.0.1:8081/user/signin', {
          email,
          password,
        });
        
        // Handle successful sign-in (e.g., navigate to home screen)
        console.log('Sign-in successful:', response.data);

              // Store the user ID in AsyncStorage
      await AsyncStorage.setItem('userId', userId);

        goToHome();
      } catch (error) {
        console.log("Error:", error)
        setError('Invalid email or password' + error);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignup}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
