package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.AuthErrorCode;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
//import java.util.concurrent.ExecutionException;
//import java.lang.InterruptedException;

@Service
public class FirebaseAuthService {

    
    private final FirebaseAuth firebaseAuth;
    //private final Firestore firestore;

    @Autowired
    public FirebaseAuthService(FirebaseApp firebaseApp, Firestore firestore) {
        this.firebaseAuth = FirebaseAuth.getInstance(firebaseApp);
       // this.firestore = firestore;
    }

    public User createUser(User user) throws FirebaseAuthException{

       try {
        // Create a new user in Firebase
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
            .setEmail(user.getEmail())
            .setPassword(user.getPassword());

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        // Set additional fields from the user object
        user.setuID(userRecord.getUid());

        return user;
        
    } catch (FirebaseAuthException e) {
        // Check if the error is due to the email already existing
        if (e.getAuthErrorCode() == AuthErrorCode.EMAIL_ALREADY_EXISTS) {
            throw new IllegalStateException("Email already exists. Please use a different email.");
        }
        throw e;  // Re-throw other exceptions if needed
    }
    }

    public UserRecord getUserById(String userID) throws FirebaseAuthException {
            return firebaseAuth.getUser(userID);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        try {
            System.out.println("In User Get Email ...");
            return firebaseAuth.getUserByEmail(email); // Attempt to get the user by email
        } catch (FirebaseAuthException e) {
            // Check if the error is because the user does not exist
            if (e.getAuthErrorCode() == AuthErrorCode.USER_NOT_FOUND) {
                throw new IllegalStateException("User with email " + email + " does not exist.");
            }
            // Re-throw other FirebaseAuthExceptions
            throw e;
        }
    }

    public void deleteUser(String userId) throws FirebaseAuthException {
     firebaseAuth.deleteUser(userId);
     System.out.println("User deleted from Firebase Auth with userID: " + userId);

    }

}
