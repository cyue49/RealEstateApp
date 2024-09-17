import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>Sign In Page</Text>
            <Link href={"/ListingsTab/listings"}>Sign In</Link>
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
