import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function Listings() {
    return (
        <View style={styles.container}>
            <Text>This is the homepage showing all the listings.</Text>
            <Link href={"/ListingsTab/listingdetails"}>Go to single listing page</Link>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
