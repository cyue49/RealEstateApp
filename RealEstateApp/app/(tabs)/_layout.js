import { Tabs } from 'expo-router';
import React from 'react';
import { bottomTabBarOptions } from '../../constants/commonStyles'
import TabBarIcon from '../../components/navigation/TabBarIcon'

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={bottomTabBarOptions}>
            <Tabs.Screen
                name="ListingsTab"
                options={{
                    title: 'Listings',
                    tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />
                }}
            />
            <Tabs.Screen
                name="InboxTab"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <TabBarIcon name='inbox' color={color} />
                }}
            />
            <Tabs.Screen
                name="MonitorTab"
                options={{
                    title: 'Monitor',
                    tabBarIcon: ({ color }) => <TabBarIcon name='check-square' color={color} />
                }}
            />
            <Tabs.Screen
                name="ProfileTab"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />
                }}
            />
        </Tabs>
    );
}