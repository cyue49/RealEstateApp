package com.example.backend.services;

import com.example.backend.entity.Chat;
import com.example.backend.entity.Message;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

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

        // update last active and latest message for chat
        String chatId = newMessage.getChatId();
        Chat chat = db.collection("chats").document(chatId).get().get().toObject(Chat.class);
        if (chat != null) {
            chat.setLatestMessage(newMessage.getMessage());
            chat.setLastActive(newMessage.getTimestamp());

            db.collection("chats").document(chatId).set(chat);
        }

        return newMessage;
    }

    // get all messages of a chat
    public List<Message> getChatMessages(String chatId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference col = db.collection("messages");

        // query all messages where chatId equals chatId, sorted by latest timestamp
        Query query = col.whereEqualTo("chatId", chatId).orderBy("timestamp", Query.Direction.DESCENDING);

        ApiFuture<QuerySnapshot> apiFuture = query.get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();

        // return list of messages
        return list.stream().map((doc) -> doc.toObject(Message.class)).collect(Collectors.toList());
    }

    // delete a message
    public void deleteMessage(String id, String chatId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // delete the message
        WriteResult writeResult = db.collection("messages").document(id).delete().get();
        System.out.println("Message deleted at: " + writeResult.getUpdateTime());

        // update chat last active and latest message
        Chat chat = db.collection("chats").document(chatId).get().get().toObject(Chat.class);
        if (chat != null) {
            chat.setLatestMessage("message deleted");
            chat.setLastActive(writeResult.getUpdateTime().toDate());

            db.collection("chats").document(chatId).set(chat);
        }
    }
}
