import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, RefreshControl } from 'react-native';
import HorizontalList from '../../../components/listing/HorizontalList';
import { Colors } from '../../../constants/Colors';
import axios from 'axios';
import { baseURL } from '../../../constants/baseURL';
import {useRouter} from 'expo-router';

const Listings = () => {
  const router = useRouter();
  const [watchedProperties, setWatchedProperties] = useState([]);
  const [justListedProperties, setJustListedProperties] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch listings from the backend
  const fetchListings = async () => {
    try {
      const response = await axios.get(`${baseURL}/listing/getAll`);
      if (response.status === 200) {
        const listings = response.data;

        const updatedListings = listings.map((listing) => {
          // Only keep the first photo for each listing
          listing.photoUrls = listing.photoUrls.length > 0 ? [listing.photoUrls[0]] : [];
          return listing;
        });

        setWatchedProperties(updatedListings.slice(0, 2));
        setJustListedProperties(updatedListings);
      } else {
        console.error('Error: Failed to load listings');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  // Fetch listings when the component is mounted
  useEffect(() => {
    fetchListings();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchListings();
    setRefreshing(false);
  };

  const handleItemPress = (item) => {
    // navigate to single listing page
    router.push(`./listingdetails/${item.listingID}`);
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
            title="Watched Properties"
            listings={watchedProperties}
            onItemPress={handleItemPress}
            onViewAllPress={() => console.log('View All Watched Properties')}
          />
          <HorizontalList
            title="Just Listed"
            listings={justListedProperties}
            onItemPress={handleItemPress}
            onViewAllPress={() => console.log('View All Just Listed')}
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

export default Listings;