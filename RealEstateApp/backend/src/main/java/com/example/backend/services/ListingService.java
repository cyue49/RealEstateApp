package com.example.backend.services;

import com.example.backend.entity.Listing;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

@Service
public class ListingService {
    // This method saves a Listing to Firestore
    public void saveListing(Listing listing) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();

        // Set the listing ID here or leave Firestore to generate a document ID
        String listingId = firestore.collection("listings").document().getId();
        listing.setListingID(listingId);

        // Save the listing
        ApiFuture<WriteResult> future = firestore.collection("listings").document(listingId).set(listing);

        // Optionally wait for the operation to complete
        WriteResult result = future.get(); // This line waits for Firestore to confirm the write

        System.out.println("Update time : " + result.getUpdateTime());
    }
}
