import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../../constants/commonStyles'

export default function Monitor() {
    const tempId = 1;
    const navigateToDetails = () => {
        router.push(`./monitordetails/${tempId}`)
    }

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Monitor Page</Text>
            <Button
                onPress={navigateToDetails}
                title='Go to monitor details page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </View>
    );
}
