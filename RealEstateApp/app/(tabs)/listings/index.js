import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>This is the homepage showing all the listings.</Text>
            <Link href={"/listings/listingdetails"}>Go to single listing page</Link>
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
