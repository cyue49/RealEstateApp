package com.example.backend.entity;

import java.util.List;
import java.util.Date;

public class Listing {
    private String listingID;          // Unique identifier for the listing
    private String description;         // Description of the listing
    private String address;             // Address of the listing
    private String city;                // City where the listing is located
    private String state;               // State of the listing (e.g., "For rent")
    private int price;                  // Price of the listing
    private int leaseTerm;              // Lease term in months
    private Date availableDate;         // Date when the listing becomes available
    private int bedrooms;               // Number of bedrooms
    private int bathrooms;              // Number of bathrooms
    private List<String> photoUrls;     // List of photo URLs
    private String userId;              // ID of the user who created the listing

    // No-argument constructor (required for Firestore)
    public Listing() {
    }

    // Constructor with parameters
    public Listing(String listingID, String description, String address, String city,
                   String state, int price, int leaseTerm, Date availableDate,
                   int bedrooms, int bathrooms, List<String> photoUrls, String userId) {
        this.listingID = listingID;
        this.description = description;
        this.address = address;
        this.city = city;
        this.state = state;
        this.price = price;
        this.leaseTerm = leaseTerm;
        this.availableDate = availableDate;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.photoUrls = photoUrls;
        this.userId = userId;
    }

    // Getters and Setters
    public String getListingID() {
        return listingID;
    }

    public void setListingID(String listingID) {
        this.listingID = listingID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getLeaseTerm() {
        return leaseTerm;
    }

    public void setLeaseTerm(int leaseTerm) {
        this.leaseTerm = leaseTerm;
    }

    public Date getAvailableDate() {
        return availableDate;
    }

    public void setAvailableDate(Date availableDate) {
        this.availableDate = availableDate;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public List<String> getPhotoUrls() {
        return photoUrls;
    }

    public void setPhotoUrls(List<String> photoUrls) {
        this.photoUrls = photoUrls;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
