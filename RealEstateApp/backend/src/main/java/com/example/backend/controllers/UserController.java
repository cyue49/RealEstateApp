package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.services.FirebaseAuthService;
import com.example.backend.services.FirestoreService;
import com.google.cloud.firestore.FirestoreException;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.example.backend.entity.User;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private FirebaseAuthService firebaseAuthService;

    @Autowired
    private FirestoreService firestoreService;

    //Endpoints

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) throws FirebaseAuthException{
        try {
            // create user in firebase auth.
             firebaseAuthService.createUser(user);

            // Save the user details to Firestore
            firestoreService.saveUserToFirestore(user);

            return ResponseEntity.ok("User created and saved to Firestore successfully");
        } catch (FirestoreException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating user: " + e.getMessage());
        }
    }
    

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        try {
            System.out.println("In Sign In Controller ...");
            UserRecord userRecord = firebaseAuthService.getUserByEmail(user.getEmail());
            return ResponseEntity.ok(userRecord);

        } catch (FirebaseAuthException e) {
            return ResponseEntity.badRequest().body("Invalid email or password.");
        }
    }
}
