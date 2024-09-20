import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors'
export default ChatMessageItem = ({ messageItem }) => {
    // temporary data
    const tempUserId = '1'

    return (
        <View style={messageItem.fromUserId === tempUserId ? styles.messageRight : styles.messageLeft}>
            {
                messageItem.fromUserId === tempUserId ?
                    <View style={styles.messageBox}>
                        <Text style={styles.message}>{messageItem.message}</Text>
                    </View> : null
            }

            <View style={styles.imageContainer}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/default-profile.png')} // temporary image
                />
            </View>

            {
                messageItem.fromUserId === tempUserId ? null :
                    <View style={styles.messageBox}>
                        <Text style={styles.message}>{messageItem.message}</Text>
                    </View>
            }
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
    messageBox: {
        borderRadius: 20,
        backgroundColor: Colors.appBlueLight,
        padding: 10,
    },
    message: {
        //
    }
});