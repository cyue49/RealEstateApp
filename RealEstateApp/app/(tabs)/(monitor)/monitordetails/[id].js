import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { singleListingStyles as styles } from '../../../../constants/commonStyles';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ListingDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const listing = {
        id: 1,
        coverImage: require('../../../../assets/listing1.jpg'),
        address: '123 Main St, City, Country',
        price: '$500,000',
    };

    const handlePress = () => {
        router.push(`/listingdetails/${listing.id}`);
    };

    return (
        <View style={[styles.containerCenter, styles.tabPageStyles]}>
            <TouchableOpacity onPress={handlePress} style={styles.listingItem}>
                <Image
                    source={listing.coverImage} 
                    style={styles.coverImage}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.address}>{listing.address}</Text>
                    <Text style={styles.price}>{listing.price}</Text>
                </View>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}
