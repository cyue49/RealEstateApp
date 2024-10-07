package com.example.backend.entity;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Chat {
    private String id;
    private List<String> users;
    private String chatName;
    private Date creationTime;
    private Date lastActive;
    private String latestMessage;
    private List<String> hasUnreadMessage;

    public Chat() {
    }

    public Chat(List<String> users, String chatName) {
        this.id = UUID.randomUUID().toString().replace("-", "");
        this.creationTime = new Date();
        this.lastActive = new Date();
        this.latestMessage = "";
        this.users = users;
        this.chatName = chatName;
        this.hasUnreadMessage = users;
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

    public Date getCreationTime() {
        return creationTime;
    }

    public Date getLastActive() {
        return lastActive;
    }

    public String getLatestMessage() {
        return latestMessage;
    }

    public List<String> getHasUnreadMessage() {
        return hasUnreadMessage;
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

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public void setLastActive(Date lastActive) {
        this.lastActive = lastActive;
    }

    public void setLatestMessage(String latestMessage) {
        this.latestMessage = latestMessage;
    }

    public void setHasUnreadMessage(List<String> hasUnreadMessage) {
        this.hasUnreadMessage = hasUnreadMessage;
    }
}
