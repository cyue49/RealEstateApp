package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {


    private FirebaseAuthService firebaseAuthService;
    private FirestoreService firestoreService;

    @Autowired
    public UserController(FirebaseAuthService firebaseAuthService, FirestoreService firestoreService) {
        this.firebaseAuthService = firebaseAuthService;
        this.firestoreService = firestoreService;
    }

    //Endpoints

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) throws FirebaseAuthException{
        try {
            // create user in firebase auth.
             firebaseAuthService.createUser(user);

            // Save the user details to Firestore
            firestoreService.saveUserToFirestore(user);

            return ResponseEntity.ok("User created and saved to Firestore successfully");
        } catch (IllegalStateException e) {
            // Handle custom exception for "email already exists"
            return ResponseEntity.status(409).body(e.getMessage());
        } catch (FirebaseAuthException e) {
            // Handle other Firebase-specific errors
            return ResponseEntity.status(500).body("Error creating user in Firebase: " + e.getMessage());
        } catch (FirestoreException e) {
            // Handle Firestore-related errors
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving user to Firestore: " + e.getMessage());
        }
    }
    

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        try {
            System.out.println("In Sign In Controller ...");
            UserRecord userRecord = firebaseAuthService.getUserByEmail(user.getEmail());
            return ResponseEntity.ok(userRecord);

        } catch (IllegalStateException e) {
            // Handle custom exception for "user not found"
            return ResponseEntity.status(404).body(e.getMessage());  // Return a 404 response
        } catch (FirebaseAuthException e) {
            // Handle other Firebase-specific errors like invalid email, invalid request, etc.
            return ResponseEntity.status(400).body("Invalid email or password.");
        } catch (Exception e) {
            // Catch any other exceptions
            return ResponseEntity.status(500).body("An error occurred during sign-in.");
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

    // Delete user endpoint
    @DeleteMapping("/profile/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        try {
            User user = new User();
            user.setuID(userId);
            firestoreService.deleteUserFromFirestore(user);
            firebaseAuthService.deleteUser(userId);

         return ResponseEntity.ok("User deleted successfully from Firestore and Firebase Auth");
       } catch (FirebaseAuthException e) {
        return ResponseEntity.status(500).body("Failed to delete user from Firebase Auth: " + e.getMessage());
     } catch (Exception e) {
        return ResponseEntity.status(500).body("Failed to delete user from Firestore: " + e.getMessage());
     }
    }

    // get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<List<User>> getUserByEmail(@PathVariable String email) {
        try {
            List<User> users = firestoreService.getUserByEmail(email);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // get user by username
    @GetMapping("username/{username}")
    public ResponseEntity<List<User>> getUserByUsername(@PathVariable String username) {
        try {
            List<User> users = firestoreService.getUserByUsername(username);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}  
