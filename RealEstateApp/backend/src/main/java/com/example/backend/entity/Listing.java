package com.example.backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import java.util.Date;

public class Listing {
    private String listingID;

    @NotBlank(message = "Address is mandatory")
    private String address;

    @Min(value = 1, message = "Price must be a positive value")
    private double price;

    @Min(value = 1, message = "There should be at least 1 bedroom")
    @Max(value = 10, message = "Bedrooms cannot exceed 10")
    private int bedrooms;

    @Min(value = 1, message = "There should be at least 1 bathroom")
    @Max(value = 10, message = "Bathrooms cannot exceed 10")
    private int bathrooms;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "State is mandatory")
    private String state;

    private Date availableDate;

    @Min(value = 1, message = "Lease term must be at least 1 month")
    @Max(value = 12, message = "Lease term cannot exceed 12 months")
    private int leaseTerm;

    private String description;

    private String userId;

    // Default constructor
    public Listing() {
    }

    // Parameterized constructor
    public Listing(String address, double price, int bedrooms, int bathrooms, String city, String state,
            Date availableDate, int leaseTerm, String description, String userId) {
        this.address = address;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.city = city;
        this.state = state;
        this.availableDate = availableDate;
        this.leaseTerm = leaseTerm;
        this.description = description;
        this.userId = userId;
    }

    // Getters and Setters

    public String getListingID() {
        return listingID;
    }

    public void setListingID(String listingID) {
        this.listingID = listingID;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public Date getAvailableDate() {
        return availableDate;
    }

    public void setAvailableDate(Date availableDate) {
        this.availableDate = availableDate;
    }

    public int getLeaseTerm() {
        return leaseTerm;
    }

    public void setLeaseTerm(int leaseTerm) {
        this.leaseTerm = leaseTerm;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}