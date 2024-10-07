package com.example.backend.services;

import com.example.backend.entity.Listing;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ListingService {

    private static final String BUCKET_NAME = "realestate-64b3d.appspot.com"; // Firebase Storage bucket name

    // This method saves a Listing to Firestore
    public void saveListing(Listing listing) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();

        // Set the listing ID or leave Firestore to generate a document ID
        String listingId = firestore.collection("listings").document().getId();
        listing.setListingID(listingId);

        // Save the listing
        ApiFuture<WriteResult> future = firestore.collection("listings").document(listingId).set(listing);

        // Optionally wait for the operation to complete
        WriteResult result = future.get(); // This line waits for Firestore to confirm the write

        System.out.println("Update time: " + result.getUpdateTime());
    }

    // Method to upload photos to Firebase Storage and return URLs
    public List<String> uploadPhotosAndGetUrls(List<MultipartFile> photos) throws IOException {
        List<String> photoUrls = new ArrayList<>();

        // Access Firebase Storage
        GoogleCredentials credentials = GoogleCredentials.fromStream(
                new FileInputStream("src/main/resources/config/serviceAccountKey.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();

        for (MultipartFile photo : photos) {
            // Generate a unique file name for each photo
            String fileName = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();

            // Create the BlobId and BlobInfo for the file
            BlobId blobId = BlobId.of(BUCKET_NAME, "listings/" + fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(photo.getContentType()).build();

            // Upload the file to Firebase Storage
            storage.create(blobInfo, photo.getBytes());

            // Get the public URL of the uploaded file
            String photoUrl = String.format("https://storage.googleapis.com/%s/listings/%s", BUCKET_NAME, fileName);
            photoUrls.add(photoUrl);
        }

        return photoUrls;
    }
}