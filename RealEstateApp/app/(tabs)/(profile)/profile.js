import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../../../constants/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    const navigateToEditPage = () => {
        router.push('./editprofile');
    };

    const navigateToSignIn = () => {
        router.replace('/signin');
    };

    const goBack = () => {
        router.back(); // Use this if you're using a navigation system that supports back
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={localstyles.blueBar}>
                <View style ={localstyles.profileText}>
                <TouchableOpacity onPress={goBack} style={localstyles.backButton}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={localstyles.profileText}>Profile</Text>
                </View>

                {/* New nested view for image and info */}
                <View style={localstyles.profileRow}>
                    <View style={localstyles.imagePlaceholder}>
                        {/* Image will be added here later */}
                    </View>
                    <View style={localstyles.profileInfo}>
                        <Text style={localstyles.email}>email: user@example.com</Text>
                        <Text style={localstyles.id}>ID : 123456</Text>
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={localstyles.actions}>
            <View style={localstyles.greyBar}>
                <TouchableOpacity style={localstyles.iconButton} onPress={navigateToEditPage}>
                    <Icon name="home" size={30} color="appBlue" />
                    <Text style = {localstyles.text}>Register My Property</Text>
                </TouchableOpacity>
                </View>
                <View style={localstyles.greyBar}>
                <TouchableOpacity style={localstyles.iconButton} onPress={navigateToSignIn}>
                    <Icon name="list" size={30} color="#appBlue" />
                    <Text style = {localstyles.text}>View My List</Text>
                </TouchableOpacity>
                </View>
            </View>

            <Button
                onPress={navigateToEditPage}
                title='Go to edit profile page'
                accessibilityLabel='Navigation button'
            />
            <Button
                onPress={navigateToSignIn}
                title='Go to sign in page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const localstyles = StyleSheet.create({
    blueBar: {
        backgroundColor: '#2976D4',
        paddingVertical: 30,
        paddingHorizontal: 20,
        width: '100%',
    },

    backButton: {
        marginRight: 10,
    },

    profileText: {
        color: '#fff',
        fontSize: 16,
        flexDirection : 'row',
       
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
    id: {
        color: '#fff',
        fontSize: 14,
    },
    
    actions: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 90,
       
    },

    greyBar: {
        backgroundColor: '#E5E4E2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row', // Align the icon and text in a row
        alignItems: 'center', // Center the contents vertically
        marginHorizontal: 30, 
        marginVertical: 20,
       
       
    },

    iconButton: {
        flexDirection: 'row', // Ensure icon and text are in the same row
        alignItems: 'center',
        paddingVertical: 20,
     
       
    },

    text: {
        marginLeft : 50,
         fontSize : 16,
    }
});
