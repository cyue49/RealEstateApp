import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router'

export default function Listings() {
    const navigateToDetails = () => {
        router.push('/ListingsTab/listingdetails')
    }

    return (
        <View style={styles.container}>
            <Text>Listings page</Text>
            <Button
                onPress={navigateToDetails}
                title='Go to single listing page'
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
