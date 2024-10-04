package com.example.backend.entity;

import jakarta.validation.constraints.Email; // Use jakarta if using jakarta.validation-api
import jakarta.validation.constraints.NotBlank; // For email validation
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size; // For size validation


public class User {
    private String uID;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password should have at least 8 characters")
    private String password;

    private String userName;

    private String photoUrl;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Invalid phone number")
    private String phoneNumber;

    private String address;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
    public User() {
    }


    // getters ans setters

    public String getuID() {
        return uID;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setuID(String uID) {
        this.uID = uID;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserName() {
        return userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
