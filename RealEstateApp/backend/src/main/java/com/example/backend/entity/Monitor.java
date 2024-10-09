package com.example.backend.entity;

import java.util.ArrayList;
import java.util.List;

public class Monitor {
    private String userId;
    private List<String> likedListings = new ArrayList<>();

    public Monitor() {}

    public Monitor(String userId, List<String> likedListings) {
        this.userId = userId;
        this.likedListings = likedListings;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getLikedListings() {
        return likedListings;
    }

    public void setLikedListings(List<String> likedListings) {
        this.likedListings = likedListings;
    }
}
