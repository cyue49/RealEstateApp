import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../constants/commonStyles'

export default function ListingDetails() {
    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Listing details page</Text>
            <StatusBar style="auto" />
        </View>
    );
}
