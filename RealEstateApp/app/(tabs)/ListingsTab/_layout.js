import { Stack } from "expo-router";
import { Colors } from '../../../commonStyles'

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.appBlue,
                },
                headerTintColor: Colors.appPurple,
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen name="listings" options={{
                title: 'Listings',
                headerShown: false
            }} />
            <Stack.Screen name="listingdetails" options={{
                title: 'Listing Details'
            }} />
        </Stack>
    );
}
