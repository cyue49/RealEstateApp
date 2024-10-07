
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../../constants/commonStyles'

export default function Listings() {

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
         <Text>Listings</Text>
            <StatusBar style="auto" />
        </View>
    );
}
