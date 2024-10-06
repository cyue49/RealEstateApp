import { StatusBar } from 'expo-status-bar';
import { Image,Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../../../constants/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { baseURL } from '../../../constants/baseURL'




export default profile = ()  => {
    const router = useRouter();
    const [user, setUser] = useState(null);  // State to store user data
    const [loading, setLoading] = useState(true);  // State to manage loading
    const [error, setError] = useState(null);  // State to manage errors
    // const userId =  "3adHg3fWqnP5rq41EPbdoGUAF082";

    useEffect(()=> {

       const  fetchUserProfile = async() => {
        try {
             const storedUserId = await AsyncStorage.getItem('userId'); // Fetch userId from AsyncStorage
            if (storedUserId) {
                // console.log(`Fetching user profile for ID: ${userId}`);
                const response = await axios.get(`${baseURL}/user/profile/${storedUserId}`);
                setUser(response.data);
            } else {
                console.error('No user ID found in storage');
            }
        } catch (err) {
            console.error('Error fetching user profile:', err);
            if (err.response) {
                console.error('Response data:', err.response.data); // Log response data
                console.error('Response status:', err.response.status); // Log response status
            }
            setError(err.response ? err.response.data : err.message);
        }
         finally {
            setLoading(false);
        }

     };

     fetchUserProfile();
    }, []);
   
    if (error) {console.log(error)}


    const navigateToEditPage = () => {
        router.push('./editprofile');
    };

    const navigateToSignIn = () => {
        router.replace('/signin');
    };

    const navigateToListing = () => {
        router.push('/listings');
    };

 
   

    const goBack = () => {
        router.back(); // Use this if you're using a navigation system that supports back
    };

    const navigateToRegisterProperty = () => {
        router.push('/registerProperty');
    };

    return (
        <View style={styles.container}>
            <View style={localstyles.blueBar}>
              
                {/* New nested view for image and info */}
                <View style={localstyles.profileRow}>
                    <View style={localstyles.imagePlaceholder}>
                        {/* Image will be added here later */}
                        {user?.photoUrl ? (
                            <Image 
                            source={user.photoUrl}
                            style = {localstyles.profileImage}
                            />
                        ) : (
                            <Text style={{ color: '#bbb' }}>No image available</Text> // Placeholder text
                        )}

                    </View>
                    <View style={localstyles.profileInfo}>
                        <Text style={localstyles.email}>
                        Email: {user?.email || "Loading..."}
                            </Text>
                    </View>
                </View>
            </View>
            <View style={localstyles.greyBar}>
            <View style={localstyles.profileInfo}>
                        <Text style={localstyles.Titledetails}> User Name:</Text> 
                        <Text style={localstyles.details}>{user?.userName || "Loading..."}</Text>
                         
                        <Text style={localstyles.Titledetails}>Address:</Text>
                         <Text style={localstyles.details}>{user?.address || "Loading..."}</Text>
                        
                        <Text style={localstyles.Titledetails}>Phone Number: </Text>
                        <Text style={localstyles.details}>{user?.phoneNumber || "Loading..."}</Text>

             </View>

            </View>

            {/* Action Buttons */}
            <View style={localstyles.actions}>
            <View style={localstyles.greyBar}>
                <TouchableOpacity style={localstyles.iconButton} onPress={navigateToEditPage}>
                    <Icon name="edit" size={30} color="#2976D4" />
                    <Text style = {localstyles.text}>edit profile</Text>
                </TouchableOpacity>
                </View>
                <View style={localstyles.greyBar}>
                <TouchableOpacity style={localstyles.iconButton} onPress={navigateToListing}>
                    <Icon name="list" size={30} color="#2976D4" />
                    <Text style = {localstyles.text}>View My List</Text>
                </TouchableOpacity>
                </View>
            </View>

        
            <Button
                onPress={navigateToSignIn}
                title='Go to sign in page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </View>
    );
}

const localstyles = StyleSheet.create({
    blueBar: {
        backgroundColor: '#2976D4',
        paddingVertical: 15,
        paddingHorizontal:20,
        width: '100%',
        marginBottom: 20,
        
    },

    backButton: {
        marginRight: 10,
    },



    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#bbb',
    },

    profileInfo: {
        justifyContent: 'center', // Center profile info text vertically
    },

    email: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    details: {
        padding: 10,
        fontSize: 14,
        marginBottom: 10,
 
    },
    
    actions: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 70,
       
    },

    greyBar: {
        backgroundColor: '#E5E4E2',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row', // Align the icon and text in a row
        alignItems: 'center', // Center the contents vertically
        marginHorizontal: 30, 
        marginVertical: 10,
       
       
    },

    iconButton: {
        flexDirection: 'row', // Ensure icon and text are in the same row
        alignItems: 'center',
        paddingVertical: 15,
     
    
    },

    text: {
        marginLeft : 50,
         fontSize : 16,
    },

    Titledetails: {
        color: '#2976D4',
        fontWeight: 'bold',
      
     },

     profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40, // Ensure the image is circular
    },
});
