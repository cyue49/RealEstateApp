import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatMessageItem from '../../../../components/inbox/ChatMessageItem'
import DateDivider from '../../../../components/inbox/DateDivider'

export default function Message() {
    // temp data
    const testMessages = [
        {
            id: '9',
            fromUserId: '2',
            toUserId: '1',
            message: 'Looking forward to it!',
            timestamp: '2024-08-07T10:18:50'
        },
        {
            id: '8',
            fromUserId: '1',
            toUserId: '2',
            message: 'Thanks! I’ll see you there on Friday.',
            timestamp: '2024-08-07T10:15:22'
        },
        {
            id: '7',
            fromUserId: '2',
            toUserId: '1',
            message: 'Sure! The property is located at 123 Main Street, Montreal.',
            timestamp: '2024-08-06T14:10:30'
        },
        {
            id: '6',
            fromUserId: '1',
            toUserId: '2',
            message: 'Great! Could you send me the address again?',
            timestamp: '2024-08-06T14:05:45'
        },
        {
            id: '5',
            fromUserId: '2',
            toUserId: '1',
            message: 'That works for me! Let’s meet at the property then.',
            timestamp: '2024-08-06T14:00:00'
        },
        {
            id: '4',
            fromUserId: '1',
            toUserId: '2',
            message: 'Yes! I\'m available next week on Friday at 4pm.',
            timestamp: '2024-08-06T13:22:02'
        },
        {
            id: '3',
            fromUserId: '2',
            toUserId: '1',
            message: 'Would you like to set up a meeting so we can discuss more about it?',
            timestamp: '2024-08-05T13:22:02'
        },
        {
            id: '2',
            fromUserId: '2',
            toUserId: '1',
            message: 'Hello! Which property are you interested in?',
            timestamp: '2024-08-05T13:21:02'
        },
        {
            id: '1',
            fromUserId: '1',
            toUserId: '2',
            message: 'Hello! I saw your posting about a property in Montreal. I am interested in your property!',
            timestamp: '2024-08-04T13:21:02'
        }
    ];

    const navigation = useNavigation();

    // chat message id
    const { id } = useLocalSearchParams();

    // states
    const [message, setMessage] = useState('')

    // fetch and set chatName from db
    useEffect(() => {
        // fetch chat title by id then set it
        fetch(`http://192.168.2.88:8080/api/chats/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                navigation.setOptions({
                    headerTitle: data.chatName
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
        // todo: fetch messages

        // set initial previous date to the date of the first message
        previousDate = testMessages[0].timestamp.split('T')[0]
    }, [testMessages])

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={testMessages}
                inverted={true}
                renderItem={({ item }) => {
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
            />

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