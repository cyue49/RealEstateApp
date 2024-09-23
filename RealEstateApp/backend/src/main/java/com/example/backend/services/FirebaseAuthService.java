package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import java.util.concurrent.ExecutionException;
import java.lang.InterruptedException;

@Service
public class FirebaseAuthService {

    
    private final FirebaseAuth firebaseAuth;
    private final Firestore firestore;

    @Autowired
    public FirebaseAuthService(FirebaseApp firebaseApp, Firestore firestore) {
        this.firebaseAuth = FirebaseAuth.getInstance(firebaseApp);
        this.firestore = firestore;
    }

    public UserRecord createUser(String email, String password) throws FirebaseAuthException{
    
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
        .setEmail(email)
        .setPassword(password);

        UserRecord userRecord = firebaseAuth.createUser(request);

        //save to firebase
        User user = new User(email, password);
        // Reference to the 'user' collection with the document ID as the user UID
        DocumentReference userDocRef = firestore.collection("user").document(userRecord.getUid());

        try {
            // Write data to Firestore
            WriteResult writeResult = userDocRef.set(user).get();
            System.out.println("User saved to Firestore at: " + writeResult.getUpdateTime());
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error saving user to Firestore: " + e.getMessage());
        }

        return userRecord;
    }

    public UserRecord getUserById(String userID) throws FirebaseAuthException {
            return firebaseAuth.getUser(userID);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        System.out.println("In User Get Email ...");
        return firebaseAuth.getUserByEmail(email);
    }

}
