import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles as commonStyles } from '../../../../constants/commonStyles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../../constants/baseURL';

export default function ListingDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListingDetails = async () => {
            if (!id) {
                console.error('Listing ID is missing');
                return;
            }
    
            try {
                const response = await axios.get(`${baseURL}/listing/${id}`);
                if (response.status === 200) {
                    setListing(response.data);
                } else {
                    console.error(`Failed to fetch listing details. Status code: ${response.status}`);
                }
            } catch (error) {
                if (error.response) {
                    // If the error response from the server exists
                    console.error(`Error fetching listing details: ${error.response.data}`);
                } else if (error.request) {
                    // If the request was made but no response was received
                    console.error('No response received from the server', error.request);
                } else {
                    // Something else happened while setting up the request
                    console.error('Error setting up the request', error.message);
                }
            }
        };
    
        fetchListingDetails();
    }, [id]);

    if (!listing) {
        return (
            <View style={[commonStyles.containerCenter, commonStyles.tabPageStyles]}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
        {/* Scrollable Image Gallery */}
        {listing.photoUrls && listing.photoUrls.length > 0 ? (
                <ScrollView horizontal style={styles.imageGallery}>
                    {listing.photoUrls.map((photoUrl, index) => (
                        <Image key={index} source={{ uri: photoUrl }} style={styles.galleryImage} />
                    ))}
                </ScrollView>
            ) : (
                <Image source={require('../../../../assets/listing/listingPlaceholder.jpg')} style={styles.coverImage} />
            )}


        {/* Listing Info */}
        <View style={styles.infoContainer}>
            <View style={styles.rowContainer}>
                <Text style={styles.listingTitle}>{listing.address}</Text>
                <Ionicons name="heart-outline" size={24} color="red" style={styles.favoriteIcon} />
            </View>
            <Text style={styles.listingDetails}>City: {listing.city}, State: {listing.state}</Text>

            <View style={styles.rowContainer}>
                <Text style={styles.listingPrice}>${listing.price}</Text>
                <Text style={styles.listingDetails}>{listing.bedrooms}B + {listing.bathrooms} Bath</Text>
            </View>

            <Text style={styles.listingDescriptionTitle}>Listing Details:</Text>
            <Text style={styles.listingDescription}>{listing.description}</Text>
        </View>
        <StatusBar style="auto" />
    </ScrollView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageGallery: {
        marginVertical: 16,
    },
    galleryImage: {
        width: 300,
        height: 200,
        marginRight: 10,
        borderRadius: 8,
    },
    coverImage: {
        width: '100%',
        height: 250,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoContainer: {
        padding: 16,
    },
    listingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listingPrice: {
        fontSize: 20,
        color: '#007AFF',
        marginBottom: 8,
    },
    listingDetails: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    listingDescription: {
        fontSize: 16,
        color: '#777',
        marginTop: 16,
    },
});