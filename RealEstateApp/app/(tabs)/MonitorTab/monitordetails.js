import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../commonStyles'

export default function MonitorDetails() {
    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Monitor details page</Text>
            <StatusBar style="auto" />
        </View>
    );
}
