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
    headerLeft: () => {
        const navigation = useNavigation(); // Access navigation here
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <Icon name="arrow-left" size={25} color="#fff" />
            </TouchableOpacity>
        );
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