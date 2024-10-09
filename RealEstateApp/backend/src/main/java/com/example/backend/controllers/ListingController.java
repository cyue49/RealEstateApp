package com.example.backend.controllers;

import com.example.backend.entity.Listing;
import com.example.backend.services.ListingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin("*")
@RequestMapping("/listing")
public class ListingController {

    private final ListingService listingService;

    @Autowired
    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping(value = "/create", consumes = { "multipart/form-data" })
    public ResponseEntity<String> createListing(
            @RequestPart("listing") String listingJson,
            @RequestPart("photos") List<MultipartFile> photos) {

        try {
            // Convert JSON String to Listing object
            ObjectMapper objectMapper = new ObjectMapper();
            Listing listing = objectMapper.readValue(listingJson, Listing.class);

            // Save listing to Firestore
            List<String> photoUrls = listingService.uploadPhotosAndGetUrls(photos);
            listing.setPhotoUrls(photoUrls);

            listingService.saveListing(listing); // Save the listing to Firestore
            return ResponseEntity.ok("Listing created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating listing: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Listing>> getAllListings() {
        try {
            List<Listing> listings = listingService.getAllListings();
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            System.err.println("Error retrieving listings: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable String id) {
        try {
            Listing listing = listingService.getListingById(id);
            if (listing != null) {
                return ResponseEntity.ok(listing);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}