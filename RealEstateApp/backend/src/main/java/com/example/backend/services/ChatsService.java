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

    // create a new chat
    public Chat createChat(Chat chat) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // create new chat with auto generated id
        Chat newChat = new Chat(chat.getUsers(), chat.getChatName());

        // save chat to firestore
        WriteResult writeResult = db.collection("chats").document(newChat.getId()).set(newChat).get();
        System.out.println("New chat created at: " + writeResult.getUpdateTime());

        return newChat;
    }

    // get all chats for user with id userId
    public List<Chat> getChatsForUser(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference col = db.collection("chats");

        // query all chats where users contains userId
        Query query = col.whereArrayContains("users", userId);

        ApiFuture<QuerySnapshot> apiFuture = query.get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();

        // return list of Chats
        return list.stream().map((doc) -> doc.toObject(Chat.class)).collect(Collectors.toList());
    }

    // get chat with id chatId
    public Chat getChat(String chatId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("chats").document(chatId);

        return docRef.get().get().toObject(Chat.class);
    }

    // rename a chat
    public Chat renameChat(String id, String chatName) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // get chat with id and rename it
        Chat chat = getChat(id);
        chat.setChatName(chatName);

        // save chat to firestore
        WriteResult writeResult = db.collection("chats").document(chat.getId()).set(chat).get();
        System.out.println("Chat name updated at: " + writeResult.getUpdateTime());

        return chat;
    }
}
