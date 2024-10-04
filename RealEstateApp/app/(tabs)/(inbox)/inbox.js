import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, FlatList, Text } from 'react-native';
import { router, useFocusEffect } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import { baseURL } from '../../../constants/baseURL'
import MessageCard from '../../../components/inbox/MessageCard'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Inbox() {
    // states
    const [query, setQuery] = useState('')
    const [chats, setChats] = useState([])
    const [userId, setUserId] = useState('')

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
    const getChats = useCallback(() => {
        if (userId !== "") {
            axios.get(`${baseURL}/api/chats/forUser/${userId}`)
                .then((res) => {
                    setChats(res.data)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [userId])

    useFocusEffect(() => {
        getChats()
    })

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
                                return <MessageCard item={item} onPress={() => navigateToMessage(item.id)} />
                            }
                        }}
                        keyExtractor={item => item.id}
                    />
                }
            })()}

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