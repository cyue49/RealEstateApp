package com.example.backend.entity;

import java.util.Date;
import java.util.UUID;

public class Message {
    private String id;
    private String chatId;
    private String fromUser;
    private String message;
    private Date timestamp;
    private boolean read;

    public Message() {
    }

    public Message(String chatId, String fromUser, String message) {
        this.id = UUID.randomUUID().toString().replace("-", "");
        this.timestamp = new Date();
        this.read = false;
        this.chatId = chatId;
        this.fromUser = fromUser;
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public String getChatId() {
        return chatId;
    }

    public String getFromUser() {
        return fromUser;
    }

    public String getMessage() {
        return message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public boolean isRead() {
        return read;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}
