import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default MessageCard = ({ inboxItem, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={styles.messageCard}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require('../../assets/favicon.png')} // temporary image
                    />
                </View>

                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.titleRow}>
                        <Text style={styles.username}>{inboxItem.username}</Text>
                        <Text style={styles.messageTime}>{inboxItem.latestMessageTime}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.previewMessage}>{inboxItem.previewMessage}</Text>
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
        borderWidth: 1,
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
    username: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.appBlueDark
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