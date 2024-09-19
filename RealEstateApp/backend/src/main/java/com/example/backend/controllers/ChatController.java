package com.example.backend.controllers;

import com.example.backend.models.Chat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/chats")
public class ChatController {

    // get all chats for user with id {id}
    // example: http://localhost:8080/api/chats/forUser/1
    @GetMapping("/forUser/{id}")
    public List<Chat> getAllChats(@PathVariable String id) {
        // sample data for testing
        Chat chat1 = new Chat("1", "2", "Chat with Alice", "Hello, I am interested in your property!", LocalDateTime.of(2024, 8, 4, 13, 21, 2));
        Chat chat2 = new Chat("1", "3", "Chat with Bob", "Hello! I saw your posting about a property in Montreal. I am interested in your property!", LocalDateTime.of(2024, 9, 3, 12, 7, 34));
        Chat chat3 = new Chat("2", "1", "Chat with Chen", "Hello, I am interested in your property!", LocalDateTime.of(2024, 8, 4, 13, 21, 2));

        List<Chat> allChats = new ArrayList<>();
        if (chat1.getForUserId().equals(id))    allChats.add(chat1);
        if (chat2.getForUserId().equals(id))    allChats.add(chat2);
        if (chat3.getForUserId().equals(id))    allChats.add(chat3);

        return allChats;
    }
}
