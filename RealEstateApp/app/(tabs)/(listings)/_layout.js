import { Stack } from "expo-router";
import { headerOptions } from '../../../constants/commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={headerOptions}>
            <Stack.Screen name="listings" options={{
                title: 'Listings',
                headerShown: false
            }} />
            <Stack.Screen name="listingdetails/[id]" options={{
                title: 'Listing Details'
            }} />
        </Stack>
    );
}
