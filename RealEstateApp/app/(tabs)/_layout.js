import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '../../constants/commonStyles'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: Colors.appLight,
                tabBarActiveTintColor: Colors.appDark,
                tabBarStyle: {
                    height: 80,
                    backgroundColor: Colors.appBlue
                }
            }}>
            <Tabs.Screen
                name="ListingsTab"
                options={{
                    title: 'Listings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
                }}
            />
            <Tabs.Screen
                name="InboxTab"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <MaterialIcons name="email" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="MonitorTab"
                options={{
                    title: 'Monitor',
                    tabBarIcon: ({ color }) => <MaterialIcons name="monitor-heart" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="ProfileTab"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}