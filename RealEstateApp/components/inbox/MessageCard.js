import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PopupModal from '../../components/inbox/PopupModal'
import SlideUpModal from '../../components/inbox/SlideUpModal'

export default MessageCard = ({ item, onPress }) => {
    const [displayTime, setDisplayTime] = useState('')
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [renamePopupVisible, setRenamePopupVisible] = useState(false);
    const [input, setInput] = useState('') // input for popup modal


    useEffect(() => {
        // get current date
        let date = new Date();
        const curDate = date.toISOString().split('T')[0];

        // split last active date and time
        const lastActiveDate = item.lastActive.split('T')[0];
        const lastActiveTime = item.lastActive.split('T')[1].split('.')[0];

        // if last message in the same day, display the time
        if (curDate === lastActiveDate) {
            setDisplayTime(lastActiveTime)
        } else { // else display the date
            setDisplayTime(lastActiveDate)
        }

        // set current app name in input
        setInput(item.chatName)
    }, [item.lastActive])

    // on long press of a chat
    const handleLongPress = () => {
        setOptionsModalVisible(!optionsModalVisible)
    }

    // when choosing rename option
    const onChooseRename = () => {
        setOptionsModalVisible(false)
        setRenamePopupVisible(true)
    }

    // when choosing delete option
    const onChooseDelete = () => {
        setOptionsModalVisible(false)
        setDeletePopupVisible(true)
    }

    // handle cancel for modals
    const handleCancel = () => {
        setOptionsModalVisible(false)
        setRenamePopupVisible(false)
        setDeletePopupVisible(false)
        setInput(item.chatName)
    }

    // handle delete for delete pop up modal
    const handleDelete = () => {
        console.log('deleted')
        setDeletePopupVisible(false)
    }

    // handle rename for rename pop up modal
    const handleRename = () => {
        console.log('renamed')
        setRenamePopupVisible(false)
    }

    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                onLongPress={handleLongPress}>
                <View style={styles.messageCard}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.profileImage}
                            source={require('../../assets/default-profile.png')} // setOptionsModalVisibleorary image
                        />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={styles.titleRow}>
                            <Text numberOfLines={1} style={styles.chatName}>{item.chatName}</Text>
                            <Text style={styles.messageTime}>{displayTime}</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.previewMessage}>{item.latestMessage === "" ? "No messages yet" : item.latestMessage}</Text>
                    </View>

                    <FontAwesome name="angle-right" size={24} color={Colors.appBlueDark} />
                </View>
            </TouchableOpacity>

            <SlideUpModal isVisible={optionsModalVisible} setisVisible={setOptionsModalVisible} handleCancel={handleCancel} message="Please choose an option:" options={["Rename Chat", "Delete Chat"]} handleOptions={[onChooseRename, onChooseDelete]} />

            <PopupModal isVisible={deletePopupVisible} setisVisible={setDeletePopupVisible} handleCancel={handleCancel} handleConfirm={handleDelete} message="Do you want to delete this chat?" input={null} />

            <PopupModal isVisible={renamePopupVisible} setisVisible={setRenamePopupVisible} handleCancel={handleCancel} handleConfirm={handleRename} message="Please enter a new name:" input={input} setInput={setInput} />
        </View>

    )
}

const styles = StyleSheet.create({
    messageCard: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.appLight,
        borderBottomWidth: 2,
        borderBottomColor: Colors.appBlueLight
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
    titleRow: {
        flex: 1,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatName: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.appBlueDark,
        maxWidth: 200
    },
    messageTime: {
        alignSelf: 'flex-start',
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.appBlueDark
    },
    previewMessage: {
        color: Colors.appGrayDark
    }
});