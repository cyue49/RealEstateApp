package com.example.backend.controllers;

import com.example.backend.entity.Listing;
import com.example.backend.services.ListingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private ListingsService listingsService;

    // Create a new listing
    @PostMapping("/create")
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing) {
        try {
            Listing newListing = listingsService.createListing(listing);
            return ResponseEntity.ok(newListing);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get all listings
    @GetMapping
    public ResponseEntity<List<Listing>> getAllListings() {
        try {
            List<Listing> listings = listingsService.getAllListings();
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get a listing by ID
    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable String id) {
        try {
            Listing listing = listingsService.getListingById(id);
            if (listing != null) {
                return ResponseEntity.ok(listing);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Update a listing
    @PutMapping("/{id}")
    public ResponseEntity<Listing> updateListing(@PathVariable String id, @RequestBody Listing updatedListing) {
        try {
            Listing updated = listingsService.updateListing(id, updatedListing);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Delete a listing
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable String id) {
        try {
            listingsService.deleteListing(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
