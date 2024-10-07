package com.example.backend.controllers;

import com.example.backend.entity.Chat;
import com.example.backend.services.ChatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "http://127.0.0.1:8081") // or whatever your React Native dev server port is
public class ChatController {

    @Autowired
    private ChatsService chatsService;

    // create a new chat
    @PostMapping("/create")
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        try {
            Chat newChat = chatsService.createChat(chat);
            return ResponseEntity.ok(newChat);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // get all chats for user with id {id}
    @GetMapping("/forUser/{id}")
    public ResponseEntity<List<Chat>> getAllChats(@PathVariable String id) {
        try {
            List<Chat> chats = chatsService.getChatsForUser(id);
            // sort chats by last active
            chats.sort(new Comparator<Chat>() {
                @Override
                public int compare(Chat o1, Chat o2) {
                    return -o1.getLastActive().compareTo(o2.getLastActive());
                }
            });
            return ResponseEntity.ok(chats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // get chat with id {id}
    @GetMapping("/id/{id}")
    public ResponseEntity<Chat> getChat(@PathVariable String id) {
        try {
            Chat chat = chatsService.getChat(id);
            return ResponseEntity.ok(chat);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // rename a chat
    @PutMapping("id/{id}/rename")
    public ResponseEntity<Chat> renameChat(@PathVariable String id, @RequestBody Map<String, Object> requestBody) {
        try {
            Chat chat = chatsService.renameChat(id, (String) requestBody.get("chatName"));
            return ResponseEntity.ok(chat);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // delete a chat
    @DeleteMapping("id/{id}/delete")
    public ResponseEntity<?> deleteChat(@PathVariable String id) {
        try {
            chatsService.deleteChat(id);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error");
        }
    }
}
