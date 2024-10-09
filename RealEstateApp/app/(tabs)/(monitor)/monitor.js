
import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, RefreshControl } from 'react-native';
import HorizontalList from '../../../components/listing/HorizontalList';
import { Colors } from '../../../constants/Colors';
import axios from 'axios';
import { baseURL } from '../../../constants/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Monitor = () => {
    const router = useRouter();
    const [allListings, setAllListings] = useState([]);
    const [monitoredListings, setMonitoredListings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [userId, setUserId] = useState(null);
    const [listingsFetched, setListingsFetched] = useState(false); // New state to track fetch status
  
    // Function to fetch user ID from AsyncStorage
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
  
    // Function to fetch all listings from the backend
    const fetchAllListings = async () => {
      try {
        const response = await axios.get(`${baseURL}/listing/getAll`);
        if (response.status === 200) {
          const listings = response.data.map((listing) => {
            listing.photoUrls = listing.photoUrls.length > 0 ? [listing.photoUrls[0]] : [];
            return listing;
          });
          setAllListings(listings);
        } else {
          console.error('Error: Failed to load listings');
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
  
    // Function to fetch monitored listings from the backend
    const fetchMonitoredListings = async () => {
      if (!userId) return;
  
      try {
        const response = await axios.get(`${baseURL}/monitor/getAll`, {
          params: { userId: userId },
        });
        if (response.status === 200) {
            console.log(response.data,allListings,'response');
  
            if (Array.isArray(response.data)) {

                const filteredListings = allListings.filter((listing) =>
                response.data.includes(listing.listingID) // Check if listingID is in monitoredListingsIds
                );
        
                // Now you can use filteredListings as needed
                console.log(filteredListings, 'filteredListings'); // Log the filtered results for debugging\\
                setMonitoredListings(filteredListings)

            } else {
            }
        } else {
          console.error('Error: Failed to load monitored listings');
        }
      } catch (error) {
        console.error('Error fetching monitored listings:', error);
      }
    };
  
    // Fetch user ID when the component is mounted
    useEffect(() => {
      fetchUserId();
    }, []);
  
    // Fetch all listings when user ID is available
    useEffect(() => {
      if (userId) {
        fetchAllListings();
      }
    }, [userId]);
  
    // Fetch monitored listings when all listings are fetched and user ID is available
    useEffect(() => {
      if (userId && allListings.length > 0 && !listingsFetched) {
        fetchMonitoredListings();
      }
    }, [userId, allListings, listingsFetched]); // Only re-run if userId or allListings change
  
    // Function to handle pull-to-refresh
    const onRefresh = async () => {
      setRefreshing(true);
      await fetchAllListings();
      setRefreshing(false);
    };
  

    const handleItemPress = (item) => {
      // navigate to single listing page
      router.push(`./monitordetails/${item.listingID}`);
  };
  
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <HorizontalList
              title="Monitored Listings"
              listings={monitoredListings}
              onItemPress={handleItemPress}
              onViewAllPress={() => console.log('View All Monitored Listings')}
              monitoredListings="true"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.appLight,
    },
  });
  

export default Monitor;
