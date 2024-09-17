import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}>
            <Tabs.Screen
                name="ListingsTab"
                options={{
                    title: 'Listings'
                }}
            />
            <Tabs.Screen
                name="InboxTab"
                options={{
                    title: 'Inbox'
                }}
            />
            <Tabs.Screen
                name="MonitorTab"
                options={{
                    title: 'Monitor'
                }}
            />
            <Tabs.Screen
                name="ProfileTab"
                options={{
                    title: 'Profile'
                }}
            />
        </Tabs>
    );
}