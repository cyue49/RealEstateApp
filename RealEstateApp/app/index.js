import React, { useEffect } from 'react'
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    // get user id from storage
    useEffect(() => {
        const fetchUserId = async () => {
            // for testing
            // await AsyncStorage.clear();

            const id = await AsyncStorage.getItem('userId');
            if (id !== undefined && id !== null && id !== '') {
                router.replace("/listings");
            } else {
                router.replace("/signin")
            }
        }
        fetchUserId();
    }, [])

    return (
        null
    );
}
