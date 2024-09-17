import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router'

export default function Profile() {
    const navigateToEditPage = () => {
        router.push('/ProfileTab/editprofile')
    }

    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
