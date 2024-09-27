import { StyleSheet } from 'react-native'
import { Colors } from './Colors'

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