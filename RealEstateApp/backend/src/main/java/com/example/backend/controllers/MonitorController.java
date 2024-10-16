package com.example.backend.controllers;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:8081") // or whatever your React Native dev server port is
public class MonitorController {

    @GetMapping("/testFirestore")
    public String testFirestore() {
        try {
            // Get Firestore instance directly from FirestoreClient
            Firestore firestore = FirestoreClient.getFirestore();

            // Query Firestore collection
            ApiFuture<QuerySnapshot> future = firestore.collection("chats").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (documents.isEmpty()) {
                return "No documents found in Firestore.";
            }

            return "Firestore connection successful! Found documents: " + documents.size();
        } catch (Exception e) {
            return "Firestore connection failed: " + e.getMessage();
        }
    }
}
