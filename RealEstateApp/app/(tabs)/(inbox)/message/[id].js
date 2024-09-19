import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../../../../constants/commonStyles'
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function Message() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();

    // fetch and set chatName from db
    useEffect(() => {
        // fetch chat title by id then set it
        fetch(`http://localhost:8080/api/chats/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                navigation.setOptions({
                    headerTitle: data.chatName
                })
            })
            .catch((e) => {
                console.log(e)
            })
    },[])

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Message page for id : {id}</Text>
            <StatusBar style="auto" />
        </View>
    );
}
