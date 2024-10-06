import { StatusBar } from 'expo-status-bar';
import { Image,Text, TextInput, View,SafeAreaView,TouchableOpacity,Button, ActivityIndicator, StyleSheet, Alert,Modal } from 'react-native';
import { styles } from '../../../constants/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRouter} from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../constants/baseURL';

const avatars = [
    require('../../../assets/avatar/avatar1.png'),
    require('../../../assets/avatar/avatar2.png'),
    require('../../../assets/avatar/avatar3.png'),
    require('../../../assets/avatar/avatar4.png'),
    require('../../../assets/avatar/avatar5.png'),
    require('../../../assets/avatar/avatar6.png'),
    require('../../../assets/avatar/avatar7.png'),
    require('../../../assets/avatar/avatar8.png'),
    require('../../../assets/avatar/avatar9.png'),
    require('../../../assets/avatar/avatar10.png'),
    require('../../../assets/avatar/avatar11.png'),
    require('../../../assets/avatar/avatar12.webp'),
    require('../../../assets/avatar/avatar13.png'),
    require('../../../assets/avatar/avatar14.png'),
    require('../../../assets/avatar/avatar15.png'),
    require('../../../assets/avatar/avatar16.png'),
    require('../../../assets/avatar/avatar17.png'),
    require('../../../assets/avatar/avatar18.png'),
    require('../../../assets/avatar/avatar19.png'),
    require('../../../assets/avatar/avatar20.png'),
    require('../../../assets/avatar/avatar21.png'),
    require('../../../assets/avatar/avatar22.png'),
];

export default function EditProfile() {

    const router = useRouter();
    const [user,setUser] = useState ({
        email: '',
        userName: '',
        address: '',
        phoneNumber: '',
        photoUrl: '',
    });
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() =>{
        const fetchUserProfile = async () =>{
            try{
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    const response = await axios.get(`${baseURL}/user/profile/${storedUserId}`);
                    setUser(response.data);
                    setOriginalUserData(response.data); // Store original user data when fetched

                }
            } catch (err) {
                setError('Failed to fetch user data');
                console.error (err);

            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    },[]);

      // Handle form submission to update user profile
      const handleUpdateProfile = async () => {

        if (JSON.stringify(user) === JSON.stringify(originalUserData)) {
            Alert.alert('No data changed');
            return;  // Exit the function if no changes were made
        }

        try{
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {
                const response = await axios.put(`${baseURL}/user/profile/${storedUserId}`,user);
                alert ('Profile updated successfully');
                router.push ('./profile');// Navigate back to profile after update
            }
        } catch (err) {
            setError('Failed to update profile');
            console.error (err);

        } 
    };

    const deleteProfile = async() => {
        const storedUserId = await AsyncStorage.getItem('userId');
        const response = await axios.delete(`${baseURL}/user/profile/${storedUserId}`);
        router.push ('/signin');// Navigate back to signin page
        await AsyncStorage.removeItem('userId')

    }

    const handleDeleteProfile = async () => {
        try{
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {

                Alert.alert(
                    "Confirm Deletion",
                    "Are you sure you want to delete your profile?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Delete", onPress: async () => await  deleteProfile() }
                    ]
                  );
                  
              
               
            }
        } catch (err) {
            // Enhanced error handling
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                setError(`Failed to delete profile: ${err.response.data}`);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('Request data:', err.request);
                setError('No response from server, please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', err.message);
                setError(`Error: ${err.message}`);
            }
        }
    };



      // Function to handle avatar selection
      const handleAvatarSelect = (avatar) => {
        setUser((prevUser) => ({
            ...prevUser,
            photoUrl: avatar,
        }));
        setModalVisible(false);

      };

      if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

      if (error) {console.log(error)}

    return (
        <SafeAreaView style={styles.container}>
        <View style={localstyles.blueBar}>
        
            {/* New nested view for image and info */}
            <View style={localstyles.profileRow}>
                <TouchableOpacity
                    style = {localstyles.imagePlaceholder}
                    onPress={() => setModalVisible(true)}>
                        {user.photoUrl ? (
                            <Image source = {user.photoUrl} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
                        ) : (
                            <Icon name="user" size={40} color="#bbb" />
                        )}

                    </TouchableOpacity>
             
                <View style={localstyles.profileInfo}>
                    <Text style={localstyles.email}>Email: </Text>
                    <TextInput
                    style = {localstyles.input}
                    value = {user.email}
                    onChangeText={(value) => setUser({...user,email:value})}
                    />

                </View>
            </View>
        </View>

        <View style={localstyles.greyBar}>
           <View style={localstyles.profileInfo}>

         
                    <Text style={localstyles.Titledetails}>Username:</Text>
                    <TextInput 
                    style = {localstyles.details}
                    value = {user.userName}
                    onChangeText={(value) => setUser({...user, userName :value})}
                    />
                  

                
                    <Text style={localstyles.Titledetails}>Address: </Text>
                    <TextInput 
                    style = {localstyles.details}
                    value = {user.address}
                    onChangeText={(value) => setUser({...user, address :value})}
                    />
               

               
                    <Text style={localstyles.Titledetails}>Phone Number:</Text>
                    <TextInput 
                    style = {localstyles.details}
                    value = {user.phoneNumber}
                    onChangeText={(value) => setUser({...user, phoneNumber :value})}
                    />
                 
           </View>
        </View>


  {/* Action Buttons */}
  <View style={localstyles.actions}>
            <View style={localstyles.greyBar}>
                <TouchableOpacity style={localstyles.iconButton} onPress={handleUpdateProfile} >
                    <Icon name="edit" size={30} color="#2976D4" />
                    <Text style = {localstyles.text}>Update profile</Text>
                </TouchableOpacity>
                </View>
                <View style={localstyles.greyBar}>
                <TouchableOpacity style={localstyles.iconButton} onPress={handleDeleteProfile}>
                    <Icon name="info-circle" size={30} color="#2976D4"/>
                    <Text style = {localstyles.text}>Delete Profile</Text>
                </TouchableOpacity>
                </View>
            </View>

  {/* Avatar Selection Modal */}
  <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={localstyles.modalContainer}>
                <View style={localstyles.modalView}>
                    <Text style={localstyles.modalTitle}>Select Avatar</Text>
                    <View style={localstyles.avatarList}>
                        {avatars.map((avatar, index) => (
                            <TouchableOpacity key={index} onPress={() => handleAvatarSelect(avatar)}>
                                <Image source={avatar} style={localstyles.avatar} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>

        <StatusBar style="auto" />
      </SafeAreaView>
   );
}

const localstyles = StyleSheet.create({
blueBar: {
    backgroundColor: '#2976D4',
    paddingVertical: 20,
    paddingHorizontal:20,
    width: '100%',
    marginBottom: 30,
},

input: {
  
    marginBottom: 16,
    paddingHorizontal: 8,
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

Titledetails: {
    color: '#2976D4',
    fontWeight: 'bold',
  
 },

details: {
    padding: 10,
    fontSize: 14,
},


greyBar: {
    backgroundColor: '#E5E4E2',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row', // Align the icon and text in a row
    alignItems: 'center', // Center the contents vertically
    marginHorizontal: 30, 
    marginVertical: 20,
   
   
},

 text: {
    marginLeft : 50,
     fontSize : 16,
  },
  
  iconButton: {
    flexDirection: 'row', // Ensure icon and text are in the same row
    alignItems: 'center',
    paddingVertical: 15,
},

modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
},
modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
},
avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
},
avatar: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 30,
},

});