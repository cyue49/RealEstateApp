import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../../constants/commonStyles'

export default function Listings() {
    const tempId = 1;
    const navigateToDetails = () => {
        router.push(`./listingdetails/${tempId}`)
    }

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <Text>Listings page</Text>
            <Button
                onPress={navigateToDetails}
                title='Go to single listing page'
                accessibilityLabel='Navigation button'
            />
            <StatusBar style="auto" />
        </View>
    );
}
