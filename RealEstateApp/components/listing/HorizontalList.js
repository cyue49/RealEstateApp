import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HorizontalList = ({ title, listings, onItemPress, onViewAllPress }) => {
    const [expanded, setExpanded] = useState(false);
    const renderListingItem = ({ item }) => {
      // Use the first photoUrl for the Image component if available
      const imageUrl = item.photoUrls && item.photoUrls.length > 0 ? item.photoUrls[0] : require('../../assets/listing/listingPlaceholder.jpg');

      return (
        <TouchableOpacity style={styles.listingItem} onPress={() => onItemPress(item)}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.listingImage}
            onError={(error) => console.error('Image load failed for:', imageUrl, error.nativeEvent)}
          />
          <View style={styles.listingInfo}>
            <Text style={styles.listingTitle}>{item.address}</Text>
            <Text style={styles.listingPrice}>${item.price}</Text>
            <Text style={styles.listingDetails}>{item.bedrooms}B + {item.bathrooms} Bath</Text>
          </View>
          <Ionicons name="heart-outline" size={24} color="red" style={styles.favoriteIcon} />
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
  
        {/* Listings FlatList */}
        <FlatList
          data={expanded ? listings : listings.slice(0, 5)}
          horizontal={!expanded}
          keyExtractor={(item) => item.listingID}
          renderItem={renderListingItem}
          contentContainerStyle={styles.listingContainer}
          ListEmptyComponent={<Text style={styles.noListingsText}>No Listings Available</Text>}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: '#fff',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    viewAllText: {
      color: '#007AFF',
    },
    listingContainer: {
      paddingHorizontal: 16,
    },
    listingItem: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      overflow: 'hidden',
      marginRight: 16,
      width: 200,
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    listingImage: {
      width: '100%',
      height: 150,
    },
    listingInfo: {
      padding: 10,
    },
    listingTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    listingPrice: {
      fontSize: 16,
      color: '#007AFF',
      marginBottom: 4,
    },
    listingDetails: {
      fontSize: 14,
      color: '#777',
    },
    favoriteIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 5,
      borderRadius: 20,
    },
    noListingsText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#777',
      marginTop: 20,
    },
  });
  
  export default HorizontalList;