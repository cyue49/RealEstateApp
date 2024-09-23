package com.example.backend.entity;

import java.time.LocalDateTime;
import java.util.UUID;

public class Chat {
    private String id;
    private String forUserId;
    private String withUserId;
    private String chatName;

    public Chat() {
    }

    public Chat(String forUserId, String withUserId, String chatName) {
        this.id = UUID.randomUUID().toString().replace("-", "");
        this.forUserId = forUserId;
        this.withUserId = withUserId;
        this.chatName = chatName;
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
}
