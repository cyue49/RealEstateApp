package com.example.backend.services;

import com.example.backend.entity.Chat;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class ChatsService {

    // get all chats for user with id userId
    public List<Chat> getChatsForUser(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference col = db.collection("chats");

        Query query = col.whereEqualTo("forUserId", userId);

        ApiFuture<QuerySnapshot> apiFuture = query.get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();

        return list.stream().map((doc) -> doc.toObject(Chat.class)).collect(Collectors.toList());
    }
}
