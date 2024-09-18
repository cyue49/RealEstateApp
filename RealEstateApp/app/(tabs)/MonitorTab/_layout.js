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