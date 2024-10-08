import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../../../constants/Colors'
import { baseURL } from '../../../../constants/baseURL'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatMessageItem from '../../../../components/inbox/ChatMessageItem'
import DateDivider from '../../../../components/inbox/DateDivider'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;

export default function Message() {
    const navigation = useNavigation();

    // chat id
    const { id } = useLocalSearchParams();

    // states
    const [message, setMessage] = useState('') // message user is currently typing
    const [chat, setChat] = useState(null) // current chat
    const [chatMessages, setchatMessages] = useState([]) // list of all messages for the chat
    const [userId, setUserId] = useState('')
    const [stompClient, setStompClient] = useState(null);

    // get user id from storage
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        }
        fetchUserId();
    }, [])

    // fetch and set current chat and chatName from db
    useEffect(() => {
        // fetch chat title by id then set it
        axios.get(`${baseURL}/api/chats/id/${id}`)
            .then((res) => {
                navigation.setOptions({
                    headerTitle: res.data.chatName
                })
                setChat(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    // handle send message 
    const handleSend = () => {
        const data = {
            chatId: id,
            fromUser: userId,
            message: message.trim()
        }

        if (message.trim() !== '') {
            // save message in db
            axios.post(`${baseURL}/api/messages/create`, data)
                .then((res) => {
                    if (res.status === 200) {
                        setMessage('')

                        // send message on websocket
                        sendMessage(res.data)

                        // add everyone else to has unread message list
                        const otherUsers = []
                        chat.users.forEach(uID => {
                            if (uID !== userId) otherUsers.push(uID)
                        });
                        const users = {
                            "hasUnreadMessage": otherUsers
                        }

                        axios.put(`${baseURL}/api/chats/id/${id}/updateUsersUnread`, users)
                            .catch((e) => {
                                console.log(e)
                            })
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    // fetch messages from db and keep track of the previous date to know when to display date dividers
    var previousDate = ''
    const updateChat = () => {
        axios.get(`${baseURL}/api/messages/forChat/${id}`)
            .then((res) => {
                setchatMessages(res.data)
                // set initial previous date to the date of the first message
                previousDate = res.data[0].timestamp.split('T')[0]
            })
            .catch((e) => {
                console.log(e)
            })
    }

    // fetch all chat messages on page load
    useEffect(() => {
        updateChat()
    }, [])

    // connect to websocket
    useEffect(() => {
        const socket = () => new SockJS(`${baseURL}/ws`);
        client = Stomp.over(socket);

        // set state
        setStompClient(client);

        // subscribe to websocket to listen for messages
        client.connect({}, () => {
            client.subscribe(`/user/${id}/reply`, (receivedMessage) => {
                console.log('Received message:' + receivedMessage.body)
                // update chat messages
                updateChat()
            });
        });

        // close connection
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected from websocket')
                })
            }
        }
    }, [])

    // sending a message over the websocket
    const sendMessage = (data) => {
        if (stompClient) {
            stompClient.send(`/app/message`, {}, JSON.stringify(data));
        }
    }

    // remove oneself from hasUnreadMessage list when entering a chat
    useEffect(() => {
        if (userId !== '' && userId !== undefined && userId !== null) {
            // fetch chat hasUnreadMessage list
            axios.get(`${baseURL}/api/chats/id/${id}`)
                .then((res) => {
                    // remove oneself from the list
                    const otherUsers = []
                    res.data.hasUnreadMessage.forEach(uID => {
                        if (uID !== userId) otherUsers.push(uID)
                    });
                    const data = {
                        "hasUnreadMessage": otherUsers
                    }

                    // update the list in db
                    axios.put(`${baseURL}/api/chats/id/${id}/updateUsersUnread`, data)
                        // .then((res) => {
                        //     console.log("removed oneself from hasUnreadMessage list")
                        // })
                        .catch((e) => {
                            console.log(e)
                        })
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    }, [userId, chatMessages])

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={styles.container}>
            {chatMessages.length === 0 ? <Text style={{ flex: 1, alignSelf: "center", margin: 10 }}>No messages yet</Text> :
                <FlatList
                    style={styles.flatList}
                    data={chatMessages}
                    inverted={true}
                    renderItem={({ item, index }) => {
                        if (index === 0) previousDate = ''
                        if (previousDate === item.timestamp.split('T')[0]) {
                            previousDate = item.timestamp.split('T')[0]
                            return <ChatMessageItem messageItem={item} />
                        } else {
                            const displayDate = previousDate
                            previousDate = item.timestamp.split('T')[0]
                            return <View>
                                <ChatMessageItem messageItem={item} />
                                <DateDivider date={displayDate} />
                            </View>
                        }
                    }}
                    ListFooterComponent={() => <DateDivider date={previousDate} />}
                    keyExtractor={(item, index) => index.toString()}
                />}

            <View style={{ height: 1, backgroundColor: Colors.appGray }}></View>

            <View style={styles.messageBoxContainer}>
                <FontAwesome name="send" size={16} color={Colors.appGray} />
                <TextInput
                    style={styles.messageBox}
                    onChangeText={setMessage}
                    value={message}
                    placeholder='Write a message'
                />
                <TouchableOpacity onPress={handleSend} >
                    <Text style={styles.sendButton}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appLight
    },
    flatList: {
        paddingHorizontal: 10,
        backgroundColor: Colors.appLight,
        // flexDirection: 'column-reverse'
    },
    messageBoxContainer: {
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
    messageBox: {
        flex: 1
    },
    sendButton: {
        color: Colors.appBlue,
        fontWeight: 'bold',
        fontSize: 12,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderStartColor: Colors.appBlue,
        borderLeftColor: Colors.appBlue,
        paddingStart: 5
    }
});