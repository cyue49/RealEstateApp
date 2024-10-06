package com.example.backend.controllers;

import com.example.backend.entity.Listing;
import com.example.backend.services.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/listing")
public class ListingController {
    private final ListingService listingService;

    @Autowired
    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createListing(@RequestBody Listing listing) {
        try {
            listingService.saveListing(listing); // Save the listing to Firestore
            return ResponseEntity.ok("Listing created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating listing: " + e.getMessage());
        }
    }

}
