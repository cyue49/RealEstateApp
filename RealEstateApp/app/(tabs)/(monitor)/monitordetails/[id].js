import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { monitorStyles as styles } from '../../../../constants/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../../constants/baseURL';

export default function MonitorDetails() {
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
                <Text>Loading...</Text>
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
                </View>
                <Text style={styles.statusField}>Status: {listing.status || 'Available'}</Text> {/* Status Field */}
                <Text style={styles.listingPrice}>Listing Price: ${listing.price}</Text> {/* Price Field */}
                
          
                <View style={styles.rowContainer}>
                    <Text style={styles.listingDetails}>{listing.bedrooms} Bedrooms</Text>
                    <Text style={styles.listingDetails}>{listing.bathrooms} Bathrooms</Text>
                </View>

            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}


