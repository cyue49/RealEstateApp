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
            <Stack.Screen name="inbox" options={{
                title: 'Inbox',
                headerShown: false
            }} />
            <Stack.Screen name="message" options={{
                title: 'Message'
            }} />
        </Stack>
    );
}
