package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
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

        // Create a new user in Firebase
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
        .setEmail(user.getEmail())
        .setPassword(user.getPassword());

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        // Set additional fields from the user object
        user.setuID(userRecord.getUid());
        

        return user;
    }

    public UserRecord getUserById(String userID) throws FirebaseAuthException {
            return firebaseAuth.getUser(userID);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        System.out.println("In User Get Email ...");
        return firebaseAuth.getUserByEmail(email);
    }

    public void deleteUser(String userId) throws FirebaseAuthException {
     firebaseAuth.deleteUser(userId);
     System.out.println("User deleted from Firebase Auth with userID: " + userId);

    }

}
