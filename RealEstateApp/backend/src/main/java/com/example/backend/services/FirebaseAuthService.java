package com.example.backend.services;

import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

@Service
public class FirebaseAuthService {

    public UserRecord createUser(String email, String password) throws FirebaseAuthException{
    
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
        .setEmail(email)
        .setPassword(password);

        return FirebaseAuth.getInstance().createUser(request);
    }

    public UserRecord getUserById(String userID) throws FirebaseAuthException {
            return FirebaseAuth.getInstance().getUser(userID);
    }

}
