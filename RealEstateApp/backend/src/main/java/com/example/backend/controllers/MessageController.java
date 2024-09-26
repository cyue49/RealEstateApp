package com.example.backend.controllers;

import com.example.backend.entity.Message;
import com.example.backend.services.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

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
            // get list of messages
            List<Message> messages = messagesService.getChatMessages(id);

            // sort list of messages based on message sent timestamp
            messages.sort(new Comparator<Message>() {
                @Override
                public int compare(Message o1, Message o2) {
                    return -(o1.getTimestamp().compareTo(o2.getTimestamp()));
                }
            });

            // return the list of messages
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
