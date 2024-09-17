import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function Inbox() {
    return (
        <View style={styles.container}>
            <Text>Inbox page</Text>
            <Link href={"/InboxTab/message"}>Go to single message page</Link>
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
