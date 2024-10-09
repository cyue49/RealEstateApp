package com.example.backend.controllers;

import com.example.backend.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class RealTimeChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/reply")
    public void sendMessage(@Payload Message message) {
        System.out.println("Received message: " + message.getMessage());
        simpMessagingTemplate.convertAndSendToUser(message.getChatId(), "/reply", message);
    }
}
