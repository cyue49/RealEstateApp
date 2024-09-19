import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { router } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import MessageCard from '../../../components/inbox/MessageCard'

export default function Inbox() {
    const tempData = [
        {
            id: '1',
            username: 'Landlord 1',
            previewMessage: 'Hello, I am interested in your property!',
            latestMessageTime: '12:00pm'
        },
        {
            id: '2',
            username: 'Landlord 2',
            previewMessage: 'Hello! I saw your posting about a property in Montreal. I am interested in your property!',
            latestMessageTime: '11:00pm'
        }
    ]

    const navigateToMessage = (id) => {
        router.push(`./message/${id}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={tempData}
                renderItem={({ item }) => <MessageCard inboxItem={item} onPress={() => navigateToMessage(item.id)} />}
                keyExtractor={item => item.id}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appLight
    }
});