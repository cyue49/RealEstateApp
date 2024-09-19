import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../../../constants/Colors'

export default function Message() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();

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
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <Text>Message page for id : {id}</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appLight
    }
});