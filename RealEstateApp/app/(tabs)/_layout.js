import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}>
            <Tabs.Screen
                name="listings"
                options={{
                    title: 'Listings'
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: 'Inbox'
                }}
            />
            <Tabs.Screen
                name="monitor"
                options={{
                    title: 'Monitor'
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile'
                }}
            />
        </Tabs>
    );
}