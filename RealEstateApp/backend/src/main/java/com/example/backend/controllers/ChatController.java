package com.example.backend.controllers;

import com.example.backend.entity.Chat;
import com.example.backend.services.ChatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/chats")
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
