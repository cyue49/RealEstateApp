import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../commonStyles'

export default function Message() {
    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Message page</Text>
            <StatusBar style="auto" />
        </View>
    );
}
