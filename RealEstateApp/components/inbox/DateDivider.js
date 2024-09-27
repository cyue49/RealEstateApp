import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors'

const DateDivider = ({ date }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.dateDisplay}>{date.split('T')[0]}</Text>
        </View>
    )
}

export default DateDivider

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    dateDisplay: {
        fontWeight: 'bold',
        color: Colors.appBlue,
        fontSize: 12,
        marginVertical: 10
    }
})