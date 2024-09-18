import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../../constants/commonStyles'
import { useLocalSearchParams } from 'expo-router';

export default function Message() {
    const { id } = useLocalSearchParams();

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Message page for id : {id}</Text>
            <StatusBar style="auto" />
        </View>
    );
}
