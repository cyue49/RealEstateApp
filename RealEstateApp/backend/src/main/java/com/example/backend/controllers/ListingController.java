package com.example.backend.controllers;

import com.example.backend.entity.Listing;
import com.example.backend.services.FirestoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.cloud.firestore.FirestoreException;

import java.util.List;

@RestController
@RequestMapping("/listing")
public class ListingController {

    @Autowired
    private FirestoreService firestoreService;

    // Create a new listing
    @PostMapping("/listing/create")
    public ResponseEntity<?> createListing(@RequestBody Listing listing) {
        try {
            firestoreService.saveListingToFirestore(listing);
            return ResponseEntity.ok("Listing created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating listing: " + e.getMessage());
        }
    }

    // Get all listings
    @GetMapping("/all")
    public ResponseEntity<List<Listing>> getAllListings() {
        try {
            List<Listing> listings = firestoreService.getAllListingsFromFirestore();
            return ResponseEntity.ok(listings);
        } catch (FirestoreException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get a listing by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getListingById(@PathVariable String id) {
        try {
            Listing listing = firestoreService.getListingById(id);
            if (listing != null) {
                return ResponseEntity.ok(listing);
            } else {
                return ResponseEntity.status(404).body("Listing not found");
            }
        } catch (FirestoreException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving listing: " + e.getMessage());
        }
    }

    // Update an existing listing
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateListing(@PathVariable String id, @RequestBody Listing listing) {
        try {
            firestoreService.updateListingInFirestore(id, listing);
            return ResponseEntity.ok("Listing updated successfully");
        } catch (FirestoreException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating listing: " + e.getMessage());
        }
    }

    // Delete a listing by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable String id) {
        try {
            firestoreService.deleteListingFromFirestore(id);
            return ResponseEntity.ok("Listing deleted successfully");
        } catch (FirestoreException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting listing: " + e.getMessage());
        }
    }
}