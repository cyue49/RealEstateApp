import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from './Colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



export const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabPageStyles: {
        backgroundColor: Colors.appLight
    }
});

export const headerOptions = {
    headerStyle: {
        backgroundColor: Colors.appBlue
    },
    // headerLeft: () => {
    //     const navigation = useNavigation(); // Access navigation here
    //     return (
    //         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
    //             <Icon name="arrow-left" size={25} color="#fff" />
    //         </TouchableOpacity>
    //     );
    // },

    headerTintColor: Colors.appLight,
    headerTitleStyle: {
        fontWeight: 'bold',
    }

 
}

export const bottomTabBarOptions = {
    headerShown: false,
    tabBarInactiveTintColor: Colors.appGray,
    tabBarActiveTintColor: Colors.appBlue,
    tabBarActiveBackgroundColor: Colors.appBlueLight,
    tabBarInactiveBackgroundColor: Colors.appLight,
    tabBarStyle: {
        height: 80,
        backgroundColor: Colors.appLight,
        fontSize: 12
    },
    tabBarItemStyle: {
        margin: 5,
        padding: 3,
        borderRadius: 50,
        borderTopWidth: 0
    }
}

export const monitorStyles = {
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageGallery: {
        marginVertical: 16,
    },
    galleryImage: {
        width: 300,
        height: 200,
        marginRight: 10,
        borderRadius: 8,
    },
    coverImage: {
        width: '100%',
        height: 250,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoContainer: {
        padding: 16,
    },
    listingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listingPrice: {
        fontSize: 20,
        color: '#007AFF',
        marginBottom: 8,
    },
    listingDetails: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    listingDescriptionTitle: {
        fontWeight: 'bold',
        marginTop: 16,
    },
    listingDescription: {
        fontSize: 16,
        color: '#777',
        marginTop: 4,
    },
    statusField: {
        fontSize: 16,
        color: '#007AFF', // Use the same color for consistency
        fontWeight: 'bold',
        marginBottom: 4,
    },
}