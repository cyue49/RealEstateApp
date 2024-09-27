import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Modal, Button } from 'react-native';
import { Colors } from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ChatMessageItem = ({ messageItem }) => {
    // states
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState('')

    // get user id from storage
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        }
        fetchUserId();
    }, [])

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
        setModalVisible(false)
    }

    return (
        <View style={messageItem.fromUser === userId ? styles.messageRight : styles.messageLeft}>
            {
                messageItem.fromUser === userId ?
                    <View>
                        <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 10, paddingBottom: 5, fontSize: 12, color: Colors.appBlue }}>{messageItem.timestamp.split('T')[1].split('.')[0]}</Text>
                        <TouchableOpacity
                            onLongPress={handleLongPress}
                            underlayColor={Colors.appLight}
                        ><View style={styles.messageBoxLeft}>
                                <Text style={styles.message}>{messageItem.message}</Text>
                            </View></TouchableOpacity>

                    </View> : null
            }

            <View style={styles.imageContainer}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/default-profile.png')} // temporary image
                />
            </View>

            {
                messageItem.fromUser === userId ? null :
                    <View>
                        <Text style={{ paddingHorizontal: 10, paddingBottom: 5, fontSize: 12, color: Colors.appBlue }}>{messageItem.timestamp.split('T')[1].split('.')[0]}</Text>
                        <TouchableOpacity
                            onLongPress={handleLongPress}
                            underlayColor={Colors.appLight}
                        ><View style={styles.messageBoxRight}>
                                <Text style={styles.message}>{messageItem.message}</Text>
                            </View></TouchableOpacity>

                    </View>
            }

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBoxContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Do you want to delete this message?</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                            <Button
                                title='Cancel'
                                onPress={handleCancel}
                                accessibilityLabel='Cancel deleting message'
                                style={styles.modalButton}
                            />
                            <Button
                                title='Confirm'
                                onPress={handleDelete}
                                accessibilityLabel='Confirm deleting message'
                                style={styles.modalButton}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
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
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(64, 64, 64, 0.5)'
    },
    modalBoxContainer: {
        height: '20%',
        width: '80%',
        borderRadius: 20,
        backgroundColor: Colors.appLight,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    modalButton: {
        flex: 1
    }
});