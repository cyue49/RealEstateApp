package com.example.backend.services;

import com.example.backend.entity.Listing;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
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
import java.util.concurrent.ExecutionException;
import com.google.cloud.storage.Blob;

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

    // Method to fetch all listings from Firestore
    public List<Listing> getAllListings() throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Get all documents in the "listings" collection
        ApiFuture<QuerySnapshot> future = firestore.collection("listings").get();

        // Convert QuerySnapshot to a List of Listings
        List<Listing> listings = new ArrayList<>();
        QuerySnapshot querySnapshot = future.get();
        if (querySnapshot != null) {
            listings = querySnapshot.toObjects(Listing.class);
            for (Listing listing : listings) {
                // Update photo URLs to be accessible from Firebase Storage
                updatePhotoUrls(listing);
            }
        }
        System.out.println("Fetched Listings: " + listings); // Add debug log
        return listings;
    }

    // Method to update photo URLs to be accessible from Firebase Storage
    private void updatePhotoUrls(Listing listing) {
        List<String> updatedPhotoUrls = new ArrayList<>();

        try {
            // Update with the correct path to your service account JSON key
            String serviceAccountKeyPath = "src/main/resources/config/serviceAccountKey.json";

            // Use service account credentials to access GCS
            Storage storage = StorageOptions.newBuilder()
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream(serviceAccountKeyPath)))
                    .build()
                    .getService();

            for (String photoPath : listing.getPhotoUrls()) {
                // Extract the path within the bucket
                String blobName = photoPath;
                if (photoPath.startsWith("https://storage.googleapis.com/")) {
                    // Strip out the prefix and retain only the relative path
                    blobName = photoPath.replace("https://storage.googleapis.com/realestate-64b3d.appspot.com/", "");
                }

                Blob blob = storage.get("realestate-64b3d.appspot.com", blobName);
                if (blob != null) {
                    String photoUrl = "https://storage.googleapis.com/" + blob.getBucket() + "/" + blob.getName();
                    updatedPhotoUrls.add(photoUrl);
                } else {
                    System.out.println("Blob not found for path: " + blobName); // Debug log
                }
            }
        } catch (IOException e) {
            System.err.println("Error accessing Google Cloud Storage: " + e.getMessage());
        }

        listing.setPhotoUrls(updatedPhotoUrls);
    }

    public Listing getListingById(String id) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Get the document with the specified ID from the "listings" collection
        ApiFuture<DocumentSnapshot> future = firestore.collection("listings").document(id).get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            Listing listing = document.toObject(Listing.class);
            updatePhotoUrls(listing); // Update photo URLs for Firebase Storage access
            return listing;
        } else {
            return null; // Listing not found
        }
    }
}