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
        backgroundColor: Colors.appBlue,
    },
    headerTintColor: Colors.appDark,
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

export const bottomTabBarOptions = {
    headerShown: false,
    tabBarInactiveTintColor: Colors.appLight,
    tabBarActiveTintColor: Colors.appDark,
    tabBarStyle: {
        height: 80,
        backgroundColor: Colors.appBlue
    }
}