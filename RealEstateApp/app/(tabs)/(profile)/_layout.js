import { Stack } from "expo-router";
import { headerOptions } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={headerOptions}>
            <Stack.Screen name="profile" options={{
                title: 'Profile',
                headerShown: true
            }} />
            <Stack.Screen name="editprofile" options={{
                title: 'Edit Profile',
                headerShown: true
                
            }} />
        </Stack>
    );
}