package com.example.backend.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class Chat {
    private String id;
    private List<String> users;
    private String chatName;

    public Chat() {
    }

    public Chat(List<String> users, String chatName) {
        this.id = UUID.randomUUID().toString().replace("-", "");
        this.users = users;
        this.chatName = chatName;
    }

    public String getId() {
        return id;
    }

    public List<String> getUsers() {
        return users;
    }

    public String getChatName() {
        return chatName;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }
}
