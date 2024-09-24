package com.example.backend.services;

import com.google.cloud.firestore.Firestore;
import com.example.backend.entity.User;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.WriteResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

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
}

