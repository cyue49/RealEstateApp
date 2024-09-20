import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default MessageCard = ({ item, onPress }) => {
    const [displayTime, setDisplayTime] = useState('')

    useEffect(() => {
        // get current date
        let date = new Date();
        const curDate = date.toISOString().split('T')[0];

        // split last active date and time
        const lastActiveDate = item.lastActive.split('T')[0];
        const lastActiveTime = item.lastActive.split('T')[1];

        // if last message in the same day, display the time
        if (curDate === lastActiveDate) {
            setDisplayTime(lastActiveTime)
        } else { // else display the date
            setDisplayTime(lastActiveDate)
        }
    }, [item.lastActive])

    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={styles.messageCard}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require('../../assets/default-profile.png')} // temporary image
                    />
                </View>

                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.titleRow}>
                        <Text numberOfLines={1} style={styles.chatName}>{item.chatName}</Text>
                        <Text style={styles.messageTime}>{displayTime}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.previewMessage}>{item.lastMessage}</Text>
                </View>

                <FontAwesome name="angle-right" size={24} color={Colors.appBlueDark} />
            </View>
        </TouchableOpacity>
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