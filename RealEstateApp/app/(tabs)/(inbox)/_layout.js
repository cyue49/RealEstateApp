import { Stack } from "expo-router";
import { headerOptions } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={headerOptions}>
            <Stack.Screen name="inbox" options={{
                title: 'Inbox'
            }} />
            <Stack.Screen name="message/[id]" options={{
                title: 'Message'
            }} />
        </Stack>
    );
}
