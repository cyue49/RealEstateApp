package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

@Service
public class FirebaseAuthService {

    
    private final FirebaseAuth firebaseAuth;

    @Autowired
    public FirebaseAuthService(FirebaseApp firebaseApp) {
        this.firebaseAuth = FirebaseAuth.getInstance(firebaseApp);
    }

    public UserRecord createUser(String email, String password) throws FirebaseAuthException{
    
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
        .setEmail(email)
        .setPassword(password);

        return firebaseAuth.createUser(request);
    }

    public UserRecord getUserById(String userID) throws FirebaseAuthException {
            return firebaseAuth.getUser(userID);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        System.out.println("In User Get Email ...");
        return firebaseAuth.getUserByEmail(email);
    }

}
