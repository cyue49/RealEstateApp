import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatMessageItem from '../../../../components/inbox/ChatMessageItem'

export default function Message() {
    // temp data
    const tempData = [
        {
            id: '1',
            fromUserId: '1',
            toUserId: '2',
            message: 'Hello! I saw your posting about a property in Montreal. I am interested in your property!',
            timestamp: '2024-08-04T13:21:02'
        },
        {
            id: '2',
            fromUserId: '2',
            toUserId: '1',
            message: 'Hi!',
            timestamp: '2024-08-06T13:21:02'
        }
    ]

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

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={tempData}
                renderItem={({ item }) =>
                    <ChatMessageItem messageItem={item} />
                }
                keyExtractor={item => item.id}
            />

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
        padding: 10,
        backgroundColor: Colors.appLight,
        borderBottomWidth: 1,
        borderBottomColor: Colors.appGray
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