package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.services.FirebaseAuthService;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private FirebaseAuthService firebaseAuthService;

    //Endpoints

    @PostMapping("/create")
    public ResponseEntity<UserRecord> createUser(@RequestParam String email, @RequestParam String password){
        UserRecord userRecord;
        try {
            userRecord = firebaseAuthService.createUser("kawtharmashkour@yahoo.com","123456789");
            return ResponseEntity.ok(userRecord);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    // endpoint to get user by id
    @GetMapping("/{uid}")
    public ResponseEntity<UserRecord> getUser(@PathVariable String uid) {
        try {
            UserRecord userRecord = firebaseAuthService.getUserById(uid);
            return ResponseEntity.ok(userRecord);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
