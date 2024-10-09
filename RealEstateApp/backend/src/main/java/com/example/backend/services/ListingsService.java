package com.example.backend.services;

import com.example.backend.entity.Listing;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class ListingsService {

    // Create a new listing
    public Listing createListing(Listing listing) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // Create new listing with auto-generated id
        DocumentReference newDocRef = db.collection("listings").document();
        listing.setListingID(newDocRef.getId()); // Set the listing ID

        // Save listing to Firestore
        WriteResult writeResult = newDocRef.set(listing).get();
        System.out.println("New listing created at: " + writeResult.getUpdateTime());

        return listing;
    }

    // Get all listings
    public List<Listing> getAllListings() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference col = db.collection("listings");

        // Query all listings
        ApiFuture<QuerySnapshot> apiFuture = col.get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();

        // Return list of Listings
        return list.stream().map((doc) -> doc.toObject(Listing.class)).collect(Collectors.toList());
    }

    // Get listing by ID
    public Listing getListingById(String listingID) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("listings").document(listingID);

        DocumentSnapshot document = docRef.get().get();
        if (document.exists()) {
            return document.toObject(Listing.class);
        } else {
            return null; // Listing not found
        }
    }

    // Update a listing
    public Listing updateListing(String listingID, Listing updatedListing) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // Update listing in Firestore
        WriteResult writeResult = db.collection("listings").document(listingID).set(updatedListing).get();
        System.out.println("Listing updated at: " + writeResult.getUpdateTime());

        return updatedListing;
    }

    // Delete a listing
    public void deleteListing(String listingID) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        WriteResult writeResult = db.collection("listings").document(listingID).delete().get();
        System.out.println("Listing deleted at: " + writeResult.getUpdateTime());
    }
}
