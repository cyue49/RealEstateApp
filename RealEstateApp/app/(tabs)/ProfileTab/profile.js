import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../../commonStyles'

export default function Profile() {
    const navigateToEditPage = () => {
        router.push('/ProfileTab/editprofile')
    }

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Profile Page</Text>
            <Button
                onPress={navigateToEditPage}
                title='Go to edit profile page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </View>
    );
}
