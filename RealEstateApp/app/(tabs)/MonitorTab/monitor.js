import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router'

export default function Monitor() {
    const navigateToDetails = () => {
        router.push('/MonitorTab/monitordetails')
    }

    return (
        <View style={styles.container}>
            <Text>Monitor Page</Text>
            <Button
                onPress={navigateToDetails}
                title='Go to monitor details page'
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
