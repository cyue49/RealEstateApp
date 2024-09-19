import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, FlatList } from 'react-native';
import { router } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import MessageCard from '../../../components/inbox/MessageCard'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Inbox() {
    // temporary data
    const tempData = [
        {
            id: '1',
            username: 'Alice',
            previewMessage: 'Hello, I am interested in your property!',
            latestMessageTime: '12:05'
        },
        {
            id: '2',
            username: 'Bob',
            previewMessage: 'Hello! I saw your posting about a property in Montreal. I am interested in your property!',
            latestMessageTime: '13:21'
        }
    ]

    // search box query
    const [query, setQuery] = useState('')

    // navigate to single message chat page
    const navigateToMessage = (id) => {
        router.push(`./message/${id}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBoxContainer}>
                <FontAwesome name="search" size={16} color={Colors.appGray} />
                <TextInput
                    autoCapitalize='none'
                    style={styles.searchBox}
                    onChangeText={setQuery}
                    value={query}
                    placeholder='Search users'
                />
            </View>

            <FlatList
                data={tempData}
                renderItem={({ item }) => {
                    if (item.username.toLowerCase().includes(query.toLowerCase())) {
                        return <MessageCard inboxItem={item} onPress={() => navigateToMessage(item.id)} />
                    }
                }}
                keyExtractor={item => item.id}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appLight
    },
    searchBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 40,
        margin: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.appGrayDark
    },
    searchBox: {
        flex: 1
    }
});