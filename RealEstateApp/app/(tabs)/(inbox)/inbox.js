import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, FlatList } from 'react-native';
import { router } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import MessageCard from '../../../components/inbox/MessageCard'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Inbox() {
    // temporary data
    const tempUserId = '1'
    const tempData = [
        {
            id: '1',
            chatName: 'Chat with Alice',
            lastMessage: 'Hello, I am interested in your property!',
            lastActive: '2024-08-04T13:21:02'
        },
        {
            id: '2',
            chatName: 'Chat with Bob',
            lastMessage: 'Hello! I saw your posting about a property in Montreal. I am interested in your property!',
            lastActive: '2024-09-19T12:07:34'
        }
    ]

    // states
    const [query, setQuery] = useState('')
    const [chats, setChats] = useState([])

    // navigate to single message chat page
    const navigateToMessage = (id) => {
        router.push(`./message/${id}`)
    }

    // get all chats for this user
    useEffect(() => {
        fetch(`http://localhost:8080/api/chats/forUser/${tempUserId}`)
            .then((res) => res.json())
            .then((data) => {
                setChats(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

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
                data={chats.length === 0 ? tempData : chats}
                renderItem={({ item }) => {
                    if (item.chatName.toLowerCase().includes(query.toLowerCase())) {
                        return <MessageCard item={item} onPress={() => navigateToMessage(item.id)} />
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