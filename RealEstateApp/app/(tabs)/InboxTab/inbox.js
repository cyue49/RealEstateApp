import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router'

export default function Inbox() {
    const navigateToMessage = () => {
        router.push('/InboxTab/message')
    }

    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
