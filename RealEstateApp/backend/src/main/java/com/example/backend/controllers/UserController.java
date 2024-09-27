package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.User;
import com.example.backend.services.FirebaseAuthService;
import com.example.backend.services.FirestoreService;
import com.google.cloud.firestore.FirestoreException;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

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


  @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable String userId) {
        try {
        // Create a User object with just the userId (or directly fetch by ID)
        User user = new User();
        user.setuID(userId);
        
        // Fetch user profile by ID
        User fetchedUser = firestoreService.getUserById(user);
            if (fetchedUser != null) {
                return ResponseEntity.ok(fetchedUser);
            } else {
                
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (FirestoreException e) {
            System.err.println("Error fetching user profile for userId " + userId + ": " + e.getMessage());
            return ResponseEntity.status(500).body("Firestore error fetching user profile: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("General error fetching user profile for userId " + userId + ": " + e.getMessage());
            return ResponseEntity.status(500).body("General Error fetching user profile: " + e.getMessage());
        }
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String userId, @RequestBody User user) {
        try {
            // Set the user ID for the updated user
            user.setuID(userId);
            firestoreService.saveUserToFirestore(user); // Use the existing method to save the updated user
            return ResponseEntity.ok(user); // Return updated user data
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user profile: " + e.getMessage());
        }
    }

    
}
