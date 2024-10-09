import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles as commonStyles } from '../../../../constants/commonStyles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../../constants/baseURL';

export default function ListingDetails() {
    const { id } = useLocalSearchParams();
    const [listing, setListing] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState('');

    // Fetch User ID
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };
        fetchUserId();
    }, []);

    // Check Liked Status
    useEffect(() => {
        const checkIfLiked = async () => {
            if (!userId || !id) {
                console.error("User ID or Listing ID is missing");
                return;
            }

            try {

                console.log( userId, id," userId id")
                const response = await axios.get(`${baseURL}/monitor/isLiked`, {
                    params: {
                        userId,
                        id,
                    },
                });

                
                setIsLiked(response.data.isLiked);
            } catch (error) {
                console.error("Error checking liked status:", error.message);
            }
        };

        if (userId) {
            checkIfLiked();
        }
    }, [id, userId]);

    // Fetch Listing Details
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
                console.error('Error fetching listing details:', error.message);
            }
        };

        fetchListingDetails();
    }, [id]);

    // Handle Like/Unlike Action
    const handleLikePress = async () => {
        if (!userId) {
            Alert.alert('Error', 'User ID is not available.');
            return;
        }

        try {
            let response;
            if (!isLiked) {
                // Add to monitor
                response = await axios.post(`${baseURL}/monitor/add`, null, {
                    params: {
                        userId: userId,
                        listingId: id
                    }
                });
            } else {
                // Remove from monitor
                response = await axios.delete(`${baseURL}/monitor/remove`, {
                    params: {
                        userId: userId,
                        listingId: id
                    }
                });
            }

            console.log(response.data);
            setIsLiked(!isLiked); // Toggle the liked state
            const message = !isLiked ? 'Property added to your monitored list.' : 'Property removed from your monitored list.';
            Alert.alert('Success', message);
        } catch (error) {
            console.error('Error updating liked status:', error.message);
            Alert.alert('Error', 'Could not update liked status. Please try again.');
        }
    };

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
                    <TouchableOpacity onPress={handleLikePress}>
                        <Ionicons 
                            name={isLiked ? "heart" : "heart-outline"} 
                            size={24} 
                            color={isLiked ? "red" : "gray"}
                            style={styles.favoriteIcon} 
                        />
                    </TouchableOpacity>
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
    listingDescriptionTitle: {
        fontWeight: 'bold',
        marginTop: 16,
    },
    listingDescription: {
        fontSize: 16,
        color: '#777',
        marginTop: 4,
    },
});
