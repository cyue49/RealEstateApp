import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import PropertyCard from '../../components/PropertyCard'; // Adjust the import path
import { lsitingPropertyCardstyles } from '../../../constants/commonStyles';
import  {baseURL } from '../../../constants/baseURL'

export default function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch listings from the API
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`${baseURL}/api/listings`); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }
                const data = await response.json();
                setListings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);


    if (loading) {
        return (
            <View style={lsitingPropertyCardstyles.containerCenter}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={lsitingPropertyCardstyles.containerCenter}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    const navigateToDetails = (listingId) => {
        // Implement navigation logic here
    };

    return (
        <View style={[lsitingPropertyCardstyles.containerCenter, lsitingPropertyCardstyles.tabPageStyles]}>
            <Text style={lsitingPropertyCardstyles.header}>Listings</Text>
            <FlatList
                data={listings}
                keyExtractor={(item) => item.listingID}
                renderItem={({ item }) => (
                    <PropertyCard 
                        listing={item} 
                        onPress={() => navigateToDetails(item.listingID)} 
                    />
                )}
                contentContainerStyle={lsitingPropertyCardstyles.cardContainer} // Optional: for padding/margins
            />
            <StatusBar style="auto" />
        </View>
    );
}
  

