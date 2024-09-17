import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
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
