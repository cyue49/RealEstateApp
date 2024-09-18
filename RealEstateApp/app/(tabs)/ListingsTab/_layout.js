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
