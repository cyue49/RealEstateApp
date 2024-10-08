import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors'
import { baseURL } from '../../constants/baseURL'
import PopupModal from '../../components/inbox/PopupModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default ChatMessageItem = ({ messageItem }) => {
    // states
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [profilePicture, setProfilePicture] = useState(null)

    // get user id from storage
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        }
        fetchUserId();
    }, [])

    // get profile picture
    useEffect(() => {
        axios.get(`${baseURL}/user/profile/${messageItem.fromUser}`) // get user
            .then((res) => {
                // console.log('getting picture')
                setProfilePicture(res.data.photoUrl)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [messageItem.fromUser])

    // set current chat messages to read on view
    useEffect(() => {
        // if has userId and not current user's own message
        if (userId !== '' && userId !== undefined && userId !== null && userId !== messageItem.fromUser) {
            const data = {
                "readStatus": true
            }
            // set read status to true
            axios.put(`${baseURL}/api/messages/id/${messageItem.id}/setRead`, data)
                // .then((res) => {
                //     console.log('message read')
                // })
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [userId, messageItem.id])

    // handle long press a message
    const handleLongPress = () => {
        setModalVisible(!modalVisible)
    }

    // handle cancel delete message
    const handleCancel = () => {
        setModalVisible(false)
    }

    // handle delete message
    const handleDelete = () => {
        axios.delete(`${baseURL}/api/messages/id/${messageItem.id}/delete/from/${messageItem.chatId}`)
            .then(() => {
                setDeleted(true)
            })
            .catch((e) => {
                console.log(e)
            })
        setModalVisible(false)
    }

    return (
        <View >
            {
                deleted ? <Text style={{ alignSelf: 'flex-end', fontStyle: 'italic', color: Colors.appRed }}>Message deleted</Text> :
                    <View style={messageItem.fromUser === userId ? styles.messageRight : styles.messageLeft}>
                        {
                            messageItem.fromUser === userId ?
                                <View>
                                    <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 10, paddingBottom: 5, fontSize: 12, color: Colors.appBlue }}>{messageItem.timestamp.split('T')[1].split('.')[0]}</Text>
                                    <TouchableOpacity
                                        onLongPress={handleLongPress}
                                        underlayColor={Colors.appLight}
                                    ><View style={styles.messageBoxLeft}>
                                            <Text>{messageItem.message}</Text>
                                        </View></TouchableOpacity>

                                </View> : null
                        }

                        <View style={styles.imageContainer}>
                            {
                                profilePicture === null ?
                                    <Image
                                        style={styles.profileImage}
                                        source={require('../../assets/default-profile.png')}
                                    /> :
                                    <Image
                                        style={styles.profileImage}
                                        source={profilePicture}
                                    />
                            }
                        </View>

                        {
                            messageItem.fromUser === userId ? null :
                                <View>
                                    <Text style={{ paddingHorizontal: 10, paddingBottom: 5, fontSize: 12, color: Colors.appBlue }}>{messageItem.timestamp.split('T')[1].split('.')[0]}</Text>
                                    <View style={[styles.messageBoxRight, messageItem.read ? null : { borderWidth: 1, borderColor: Colors.appBlue }]}>
                                        <Text>{messageItem.message}</Text>
                                    </View>
                                </View>
                        }
                    </View>
            }

            <PopupModal isVisible={modalVisible} setisVisible={setModalVisible} handleCancel={handleCancel} handleConfirm={handleDelete} message="Do you want to delete this message?" input={null} />
        </View>
    )
}

const styles = StyleSheet.create({
    messageLeft: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 7,
        marginRight: 100
    },
    messageRight: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 7,
        marginLeft: 100
    },
    imageContainer: {
        borderRadius: 50,
        borderColor: Colors.appBlueDark,
        overflow: 'hidden'
    },
    profileImage: {
        width: 40,
        height: 40
    },
    messageBoxLeft: {
        borderRadius: 20,
        backgroundColor: Colors.appGrayLight,
        padding: 10,
    },
    messageBoxRight: {
        borderRadius: 20,
        backgroundColor: Colors.appBlueLight,
        padding: 10,
    }
});