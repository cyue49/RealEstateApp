import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../../commonStyles'

export default function Inbox() {
    const navigateToMessage = () => {
        router.push('/InboxTab/message')
    }

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Inbox page</Text>
            <Button
                onPress={navigateToMessage}
                title='Go to message page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </View>
    );
}
