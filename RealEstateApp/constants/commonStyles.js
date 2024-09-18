import { StyleSheet } from 'react-native'

export const Colors = {
    appGreen: '#80e091',
    appPurple: '#a89fec',
    appYellow: '#d1e497',
    appPink: '#e3b7c8',
    appBlue: '#a3daec',
    appDark: '#070707',
    appLight: '#ececec',
}

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