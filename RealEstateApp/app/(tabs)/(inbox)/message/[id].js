import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../../../constants/Colors'
import { baseURL } from '../../../../constants/baseURL'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatMessageItem from '../../../../components/inbox/ChatMessageItem'
import DateDivider from '../../../../components/inbox/DateDivider'
import axios from 'axios';

export default function Message() {
    const navigation = useNavigation();

    // chat id
    const { id } = useLocalSearchParams();

    // states
    const [message, setMessage] = useState('') // message user is currently typing
    const [chatMessages, setchatMessages] = useState([]) // list of all messages for the chat

    // fetch and set chatName from db
    useEffect(() => {
        // fetch chat title by id then set it
        axios.get(`${baseURL}/api/chats/id/${id}`)
            .then((res) => {
                navigation.setOptions({
                    headerTitle: res.data.chatName
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    // handle send message 
    const handleSend = () => {
        // todo
    }

    // fetch messages from db and keep track of the previous date to know when to display date dividers
    var previousDate = ''
    useEffect(() => {
        // fetch messages
        axios.get(`${baseURL}/api/messages/forChat/${id}`)
            .then((res) => {
                setchatMessages(res.data)
                // set initial previous date to the date of the first message
                previousDate = res.data[0].timestamp.split('T')[0]
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

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
                    keyExtractor={item => item.id}
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