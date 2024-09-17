import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
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