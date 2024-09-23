package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

@Service
public class FirebaseAuthService {

    private final FirebaseApp firebaseApp;

    @Autowired
    public FirebaseAuthService(FirebaseApp firebaseApp) {
        this.firebaseApp = firebaseApp;
    }

    public UserRecord createUser(String email, String password) throws FirebaseAuthException{
    
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
        .setEmail(email)
        .setPassword(password);

        return FirebaseAuth.getInstance(firebaseApp).createUser(request);
    }

    public UserRecord getUserById(String userID) throws FirebaseAuthException {
            return FirebaseAuth.getInstance(firebaseApp).getUser(userID);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        System.out.println("In User Get Email ...");
        return FirebaseAuth.getInstance(firebaseApp).getUserByEmail(email);
    }

}
