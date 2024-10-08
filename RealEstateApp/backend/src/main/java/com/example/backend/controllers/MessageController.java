package com.example.backend.controllers;

import com.example.backend.entity.Message;
import com.example.backend.services.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
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

    // delete a message from chat
    @DeleteMapping("/id/{id}/delete/from/{chatId}")
    public ResponseEntity<?> deleteMessage(@PathVariable String id, @PathVariable String chatId) {
        try {
            messagesService.deleteMessage(id, chatId);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error");
        }
    }

    // set the read status of a message to true
    @PutMapping("id/{id}/setRead")
    public ResponseEntity<Message> readMessage(@PathVariable String id, @RequestBody Map<String, Object> requestBody) {
        try {
            Message message = messagesService.updateRead(id, (boolean) requestBody.get("readStatus"));
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
