package com.example.backend.controllers;

import com.example.backend.entity.Message;
import com.example.backend.services.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:8081") // or whatever your React Native dev server port is
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessagesService messagesService;

    // create new message
    @PostMapping("/create")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        try {
            Message newMessage = messagesService.createMessage(message);
            return ResponseEntity.ok(newMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // get all messages for chat with id {id}
    @GetMapping("/forChat/{id}")
    public ResponseEntity<List<Message>> getAllMessages(@PathVariable String id) {
        try {
            List<Message> messages = messagesService.getChatMessages(id);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/id/{id}/delete/from/{chatId}")
    public ResponseEntity<?> deleteMessage(@PathVariable String id, @PathVariable String chatId) {
        try {
            messagesService.deleteMessage(id, chatId);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error");
        }
    }
}
