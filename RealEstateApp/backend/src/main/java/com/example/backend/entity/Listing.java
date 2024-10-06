package com.example.backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Listing {

    private String listingID;

    @NotBlank(message = "Address is mandatory")
    private String address;

    @NotNull(message = "Price is mandatory")
    private Double price;

    @NotNull(message = "Number of bedrooms is mandatory")
    private Integer bedrooms;

    @NotNull(message = "Number of bathrooms is mandatory")
    private Integer bathrooms;

    private String description;

    private String photoUrl;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "Province is mandatory")
    private String province;

    private String zipCode;

    private String propertyType; // E.g., apartment, house, condo, etc.

    public Listing() {
    }

    public Listing(String address, Double price, Integer bedrooms, Integer bathrooms, String city, String province) {
        this.address = address;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.city = city;
        this.province = province;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String state) {
        this.province = province;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }
}