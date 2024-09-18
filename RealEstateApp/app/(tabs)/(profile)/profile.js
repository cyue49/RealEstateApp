import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../../constants/commonStyles'

export default function Profile() {
    const navigateToEditPage = () => {
        router.push('./editprofile')
    }

    const navigateToSignIn = () => {
        router.replace('/signin')
    }

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Profile Page</Text>
            <Button
                onPress={navigateToEditPage}
                title='Go to edit profile page'
                accessibilityLabel='Navigation button'
            />
            <Button
                onPress={navigateToSignIn}
                title='Go to sign in page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </View>
    );
}
