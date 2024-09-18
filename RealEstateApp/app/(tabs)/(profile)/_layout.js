import { Stack } from "expo-router";
import { headerOptions } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={headerOptions}>
            <Stack.Screen name="profile" options={{
                title: 'Profile',
                headerShown: false
            }} />
            <Stack.Screen name="editprofile" options={{
                title: 'Edit Profile'
            }} />
        </Stack>
    );
}