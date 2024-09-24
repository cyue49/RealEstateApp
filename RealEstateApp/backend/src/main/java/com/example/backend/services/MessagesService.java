package com.example.backend.services;

import com.example.backend.entity.Message;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class MessagesService {

    // create a new message
    public Message createMessage(Message message) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // create new message with auto generated id and timestamp
        Message newMessage = new Message(message.getChatId(), message.getFromUser(), message.getToUser(), message.getMessage());

        // save message to firestore
        WriteResult writeResult = db.collection("messages").document(newMessage.getId()).set(newMessage).get();
        System.out.println("New message created at: " + writeResult.getUpdateTime());

        return newMessage;
    }
}
