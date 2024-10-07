package com.example.backend.services;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import com.example.backend.entity.Chat;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.google.api.core.ApiFuture;


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

     // Method to delet user from database by user ID
  public void deleteUserFromFirestore(User user){

    // Get reference to Firestore document and delete
        DocumentReference userDocRef = firestore.collection("user").document(user.getuID());
       
        ApiFuture<WriteResult> writeResult= userDocRef.delete();
        System.out.println("User delet from Firestore with userID: " + user.getuID());
     
        writeResult.addListener(() -> {
            System.out.println("User deleted from Firestore with userID: " + user.getuID());
        }, Runnable::run);
        
    }

    // get user by email
    public List<User> getUserByEmail(String email) throws ExecutionException, InterruptedException {
        CollectionReference col = firestore.collection("user");

        Query query = col.whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> apiFuture = query.get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();

        // return list of Chats
        return list.stream().map((doc) -> doc.toObject(User.class)).collect(Collectors.toList());
    }

    // get user by username
    public List<User> getUserByUsername(String username) throws ExecutionException, InterruptedException {
        CollectionReference col = firestore.collection("user");

        Query query = col.whereEqualTo("userName", username);
        ApiFuture<QuerySnapshot> apiFuture = query.get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();

        // return list of Chats
        return list.stream().map((doc) -> doc.toObject(User.class)).collect(Collectors.toList());
    }
}

