import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../commonStyles'

export default function EditProfile() {
    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Edit Profile Page</Text>
            <StatusBar style="auto" />
        </View>
    );
}
