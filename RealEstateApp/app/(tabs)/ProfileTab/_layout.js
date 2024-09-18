import { Stack } from "expo-router";
import { Colors } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.appBlue,
                },
                headerTintColor: Colors.appDark,
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
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