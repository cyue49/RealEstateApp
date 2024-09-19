package com.example.backend.models;

import java.time.LocalDateTime;
import java.util.UUID;

public class Chat {
    private String id;
    private String forUserId;
    private String withUserId;
    private String chatName;
    private String lastMessage;
    private LocalDateTime lastActive;

    public Chat(String forUserId, String withUserId, String chatName, String lastMessage, LocalDateTime lastActive) {
        this.id = UUID.randomUUID().toString().replace("-", "");
        this.forUserId = forUserId;
        this.withUserId = withUserId;
        this.chatName = chatName;
        this.lastMessage = lastMessage;
        this.lastActive = lastActive;
    }

    public String getId() {
        return id;
    }

    public String getForUserId() {
        return forUserId;
    }

    public String getWithUserId() {
        return withUserId;
    }

    public String getChatName() {
        return chatName;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public LocalDateTime getLastActive() {
        return lastActive;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setForUserId(String forUserId) {
        this.forUserId = forUserId;
    }

    public void setWithUserId(String withUserId) {
        this.withUserId = withUserId;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public void setLastActive(LocalDateTime lastActive) {
        this.lastActive = lastActive;
    }
}
