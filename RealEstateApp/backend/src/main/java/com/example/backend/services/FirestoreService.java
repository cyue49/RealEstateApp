package com.example.backend.services;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;

@Service
public class FirestoreService {

    @Autowired
    private Firestore firestore;

    // Method to save user data to Firestore
    public void saveUserToFirestore(User user) {
        DocumentReference userDocRef = firestore.collection("user").document(user.getuID());

        try {
            
            WriteResult writeResult = userDocRef.set(user).get();
            System.out.println("User saved to Firestore at: " + writeResult.getUpdateTime());
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error saving user to Firestore: " + e.getMessage());
        }
    }

    // Method to fetch user data by user ID
    public User getUserById(User user) {
        DocumentReference userDocRef = firestore.collection("user").document(user.getuID());
        System.out.println(user.getuID());
        try {
            DocumentSnapshot document = userDocRef.get().get();
            if (document.exists()) {
                return document.toObject(User.class); // Convert Firestore document to User object
            } else {
                System.out.println("No such user exists!");
                return null;
            }
        } catch (InterruptedException e) {
            System.err.println("Interrupted while fetching user: " + e.getMessage());
            return null;
        } catch (ExecutionException e) {
            System.err.println("Execution error fetching user: " + e.getMessage());
            return null;
        }
    }
}

