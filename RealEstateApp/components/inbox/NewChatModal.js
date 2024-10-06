import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../constants/Colors'
import { router } from 'expo-router'
import axios from 'axios';
import { baseURL } from '../../constants/baseURL'

export default NewChatModal = ({ isVisible, setisVisible, userId }) => {
    // states
    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userSelected, setUserSelected] = useState(false);
    const [chatname, setChatname] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    // handle continue
    const handleContinue = async () => {
        if (input.trim() === '' && !selectedUser) {
            setErrorMessage('Please enter an email or a username.')
        } else {
            setErrorMessage('')
            setUsers([])
            // fetch all chats where email equals or username equals
            const tempList = new Set();
            await axios.get(`${baseURL}/user/email/${input.trim()}`)
                .then((res) => {
                    if (res.data.length !== 0) {
                        res.data.forEach(item => tempList.add(item));
                    }
                })
                .catch((e) => {
                    console.log(e)
                })

            await axios.get(`${baseURL}/user/username/${input.trim()}`)
                .then((res) => {
                    if (res.data.length !== 0) {
                        res.data.forEach(item => tempList.add(item));
                    }
                })
                .catch((e) => {
                    console.log(e)
                })

            if ([...tempList].length === 0) {
                setErrorMessage('No user of this email or username exists.')
            } else {
                setUsers([...tempList])
            }
        }

    }

    // once a user has been selected
    useEffect(() => {
        if (selectedUser !== null) {
            if (selectedUser.uID === userId) {
                setErrorMessage('You cannot send a message to yourself.')
                setSelectedUser(null)
            } else {
                setErrorMessage('')
                setUserSelected(true)
            }
        }
    }, [selectedUser])

    // handle create new chat
    const handleCreate = () => {
        if (chatname.trim() === '') {
            setErrorMessage('Please enter a chatname.')
        } else {
            const data = {
                users: [selectedUser.uID, userId],
                chatName: chatname.trim()
            }

            // create new chat in db
            axios.post(`${baseURL}/api/chats/create`, data)
                .then((res) => {
                    if (res.status === 200) {
                        handleCancel();
                        navigateToMessage(res.data.id)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    }

    // handle cancel
    const handleCancel = () => {
        setInput('')
        setChatname('')
        setErrorMessage('')
        setUsers([])
        setUserSelected(false)
        setisVisible(false)
    }

    // navigate to message chat page
    const navigateToMessage = (id) => {
        router.push(`./message/${id}`)
    }

    return (
        <Modal
            animationType='slide'
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setisVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBoxContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: Colors.appBlueDark }}>Start a New Chat</Text>
                    {errorMessage === '' ? null : <Text style={{ color: Colors.appRed, fontWeight: 'bold', fontSize: 12 }}>{errorMessage}</Text>}

                    {
                        // user not selected 
                        !userSelected ?
                            <View style={{ width: '100%' }}>
                                <View style={{ width: '100%', gap: 5 }}>
                                    <Text style={styles.messageLabel}>Email/Username: </Text>
                                    <TextInput
                                        style={styles.messageBox}
                                        onChangeText={setInput}
                                        value={input}
                                    />
                                </View>

                                <FlatList
                                    style={styles.selectList}
                                    data={users}
                                    renderItem={({ item }) => {
                                        return <TouchableOpacity onPress={() => setSelectedUser(item)}>
                                            <View style={styles.selectListItem}>
                                                <Text numberOfLines={1} style={{ color: Colors.appBlueDark, fontWeight: 'bold', fontSize: 16 }}>{item.userName}</Text>
                                                <Text numberOfLines={1} style={{ color: Colors.appGrayDark, fontWeight: 'bold', fontSize: 12 }}>{item.email}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }}
                                    keyExtractor={item => item.uID}
                                />
                            </View> :

                            // user selected
                            <View style={{ width: '100%', gap: 15 }}>
                                <View style={{ width: '100%', gap: 5 }}>
                                    <Text style={styles.messageLabel}>With user: </Text>
                                    <Text numberOfLines={1} style={{ color: Colors.appGrayDark, fontSize: 14 }}>{selectedUser.email}</Text>
                                </View>

                                <View style={{ width: '100%', gap: 5 }}>
                                    <Text style={styles.messageLabel}>Chat name: </Text>
                                    <TextInput
                                        style={styles.messageBox}
                                        onChangeText={setChatname}
                                        value={chatname}
                                    />
                                </View>
                            </View>
                    }


                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={handleCancel}
                            style={[styles.modalButton, { borderColor: Colors.appGrayDark }]}>
                            <Text style={{ color: Colors.appGrayDark }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={userSelected ? handleCreate : handleContinue}
                            style={[styles.modalButton, { borderColor: Colors.appBlue }]}>
                            <Text style={{ color: Colors.appBlue }}>{userSelected ? 'Create' : 'Continue'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(64, 64, 64, 0.5)',
    },
    modalBoxContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: Colors.appLight,
        padding: 15,
        gap: 15,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        justifyContent: 'space-around'
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.appDark,
        borderRadius: 50,
        padding: 10
    },
    messageBox: {
        borderWidth: 1,
        borderColor: Colors.appBlue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
        width: '100%'
    },
    messageLabel: {
        color: Colors.appBlueDark,
        fontWeight: 'bold',
        fontSize: 14
    },
    selectList: {
        width: '100%'
    },
    selectListItem: {
        gap: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.appBlue
    }
});