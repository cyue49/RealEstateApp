package com.example.backend.services;

import org.springframework.stereotype.Service;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class MonitorService {
    
        public void addListingToMonitor(String userId, String listingId) throws Exception {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference monitorRef = db.collection("monitor").document(userId);
    
            // Add listingId to the user's monitored listings (using arrayUnion to avoid duplicates)
            Map<String, Object> updates = new HashMap<>();
            updates.put("listingIds", FieldValue.arrayUnion(listingId));
    
            // Merge the update into the existing document or create a new document
            monitorRef.set(updates, SetOptions.merge());
        }
    
        public void removeListingFromMonitor(String userId, String listingId) throws Exception {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference monitorRef = db.collection("monitor").document(userId);
    
            // Remove listingId from the user's monitored listings (using arrayRemove)
            Map<String, Object> updates = new HashMap<>();
            updates.put("listingIds", FieldValue.arrayRemove(listingId));
    
            monitorRef.set(updates, SetOptions.merge());
        }
    
        public List<String> getMonitoredListings(String userId) throws Exception {
            Firestore db = FirestoreClient.getFirestore();
            DocumentSnapshot snapshot = db.collection("monitor").document(userId).get().get();
    
            if (snapshot.exists()) {
                // Retrieve the listingIds array from the user's document
                return (List<String>) snapshot.get("listingIds");
            } else {
                return new ArrayList<>(); // Return an empty list if the document doesn't exist
            }
        }
    
        public boolean isListingLiked(String userId, String listingId) throws Exception {
            List<String> monitoredListings = getMonitoredListings(userId);
            return monitoredListings.contains(listingId);
        }
    }
    
    