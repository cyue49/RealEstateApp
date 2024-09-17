import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
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