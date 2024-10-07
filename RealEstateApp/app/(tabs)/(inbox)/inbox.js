import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import { baseURL } from '../../../constants/baseURL'
import ChatCard from '../../../components/inbox/ChatCard'
import NewChatModal from '../../../components/inbox/NewChatModal'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Inbox() {
    // states
    const [query, setQuery] = useState('')
    const [chats, setChats] = useState([])
    const [userId, setUserId] = useState('')
    const [newChatModalVisible, setNewChatModalVisible] = useState(false);

    // navigate to single message chat page
    const navigateToMessage = (id) => {
        router.push(`./message/${id}`)
    }

    // get user id from storage
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        }
        fetchUserId();
    }, [])

    // get all chats for this user
    const getChats = () => {
        if (userId !== "") {
            axios.get(`${baseURL}/api/chats/forUser/${userId}`)
                .then((res) => {
                    setChats(res.data)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    // get chats for user
    useEffect(() => {
        getChats()
    }, [userId])

    // get updated chats every 2 seconds when screen is focused
    useFocusEffect(() => {
        const myInterval = setInterval(() => {
            getChats()
        }, 2000)

        return () => clearInterval(myInterval);
    })

    // new chat button
    const onNewChat = () => {
        setNewChatModalVisible(true)
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
                    placeholder='Search chats'
                />
            </View>
            <TouchableOpacity onPress={onNewChat}>
                <View style={styles.newChatContainer}>
                    <FontAwesome name="plus" size={16} color={Colors.appBlue} />
                    <Text style={styles.newChatText}>New Chat</Text>
                </View>
            </TouchableOpacity>

            {(() => {
                if (userId === "") {
                    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Please sign in to view your inbox</Text>
                    </View>
                } else if (chats.length === 0) {
                    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>You don't have any messages yet.</Text>
                    </View>
                } else {
                    return <FlatList
                        data={chats}
                        renderItem={({ item }) => {
                            if (item.chatName.toLowerCase().includes(query.toLowerCase())) {
                                return <ChatCard item={item} onPress={() => navigateToMessage(item.id)} />
                            }
                        }}
                        keyExtractor={item => item.id}
                    />
                }
            })()}

            <NewChatModal isVisible={newChatModalVisible} setisVisible={setNewChatModalVisible} userId={userId} setChats={setChats} />

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
    },
    newChatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        borderWidth: 1,
        borderColor: Colors.appBlue,
        borderRadius: 50,
        padding: 6,
        marginHorizontal: 10,
        marginBottom: 6
    },
    newChatText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.appBlue
    }
});