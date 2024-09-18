import { Stack } from "expo-router";
import { headerOptions } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={headerOptions}>
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
