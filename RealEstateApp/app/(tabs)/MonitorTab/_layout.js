import { Stack } from "expo-router";
import { headerOptions } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={headerOptions}>
            <Stack.Screen name="monitor" options={{
                title: 'Monitor',
                headerShown: false
            }} />
            <Stack.Screen name="monitordetails" options={{
                title: 'Monitor Details'
            }} />
        </Stack>
    );
}