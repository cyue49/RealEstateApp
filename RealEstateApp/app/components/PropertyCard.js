// PropertyCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { lsitingPropertyCardstyles } from '../../constants/commonStyles'; // Adjust the import according to your structure

const PropertyCard = ({ listing, onPress }) => {
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/realestate-64b3d.appspot.com/o/listings%2Fimage1.jpg?alt=media&token=8f48126b-cd8c-4ae3-a705-52d58fdd4ce2';

    return (
        <Card style={lsitingPropertyCardstyles.card}>
            <Card.Cover source={{ uri: imageUrl}} />
            <Card.Content>
                <Text style={lsitingPropertyCardstyles.cardTitle}>{listing.description || 'No description available'}</Text>
                <Text style={lsitingPropertyCardstyles.cardDetails}>${listing.price} / month</Text>
                <Text style={lsitingPropertyCardstyles.cardDetails}>{listing.bedrooms} Bedrooms, {listing.bathrooms} Bathrooms</Text>
                <Text style={lsitingPropertyCardstyles.cardDetails}>{listing.city}, {listing.address}</Text>
                <Text style={lsitingPropertyCardstyles.availableDate}>Available: {new Date(listing.availableDate).toLocaleDateString()}</Text>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity onPress={onPress}>
                    <Text style={lsitingPropertyCardstyles.cardButton}>View Details</Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>
    );
};

export default PropertyCard;
