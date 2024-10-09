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

export const button = {
        backgroundColor: Colors.appBlue,
        paddingVertical: 15,
        borderRadius: 25,
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
}

export const buttonOutLine = {
    paddingVertical: 5,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 2,     
  borderColor: Colors.appBlue,
  flexDirection: 'row', 
  justifyContent: 'center'
}
export const buttonText = {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
}

export const link = {
    color: Colors.appBlue,
    marginTop: 15,
    fontWeight: "bold",
}

export const favicon = {
    width: 150,   
    height: 150,  
    marginBottom: 30
}