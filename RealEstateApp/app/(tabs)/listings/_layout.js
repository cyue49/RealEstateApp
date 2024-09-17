import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: 'Listings',
                headerShown: false
            }} />
            <Stack.Screen name="listingdetails" options={{
                title: 'Listing Details'
            }} />
        </Stack>
    );
}
