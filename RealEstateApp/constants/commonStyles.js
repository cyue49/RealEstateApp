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

export const singleListingStyles = {
    listingItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    coverImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    address: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: 'green',
    },
};

export const lsitingPropertyCardstyles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    tabPageStyles: {
        // Add styles for your tab pages if necessary
    },
    card: {
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3, // shadow effect for Android
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 14,
        color: '#555',
    },
    availableDate: {
        fontSize: 12,
        color: '#888',
    },
    cardButton: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardContainer: {
        paddingBottom: 100, // For better spacing at the bottom
    },
});