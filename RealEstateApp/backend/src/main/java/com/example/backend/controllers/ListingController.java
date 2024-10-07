package com.example.backend.controllers;

import com.example.backend.entity.Listing;
import com.example.backend.services.ListingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/listing")
@CrossOrigin(origins = "http://127.0.0.1:8081") // or whatever your React Native dev server port is
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
}