import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors'

export default ChatMessageItem = ({ messageItem }) => {
    // temporary data
    const tempUserId = '1'

    return (
        <View style={messageItem.fromUser === tempUserId ? styles.messageRight : styles.messageLeft}>
            {
                messageItem.fromUser === tempUserId ?
                    <View>
                        <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 10, paddingBottom: 5, fontSize: 12, color: Colors.appBlue }}>{messageItem.timestamp.split('T')[1].split('.')[0]}</Text>
                        <View style={styles.messageBoxLeft}>
                            <Text style={styles.message}>{messageItem.message}</Text>
                        </View>
                    </View> : null
            }

            <View style={styles.imageContainer}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/default-profile.png')} // temporary image
                />
            </View>

            {
                messageItem.fromUser === tempUserId ? null :
                    <View>
                        <Text style={{ paddingHorizontal: 10, paddingBottom: 5, fontSize: 12, color: Colors.appBlue }}>{messageItem.timestamp.split('T')[1].split('.')[0]}</Text>
                        <View style={styles.messageBoxRight}>
                            <Text style={styles.message}>{messageItem.message}</Text>
                        </View>
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
});