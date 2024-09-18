import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../../constants/commonStyles'

export default function Inbox() {
    const tempId = 1;
    const navigateToMessage = () => {
        router.push(`./message/${tempId}`)
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
