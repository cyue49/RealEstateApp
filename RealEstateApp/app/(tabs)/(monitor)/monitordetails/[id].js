import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../../constants/commonStyles'
import { useLocalSearchParams } from 'expo-router';

export default function MonitorDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Monitor details page for id: {id}</Text>
            <StatusBar style="auto" />
        </View>
    );
}
