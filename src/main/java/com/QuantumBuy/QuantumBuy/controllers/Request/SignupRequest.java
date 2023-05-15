package com.QuantumBuy.QuantumBuy.controllers.Request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Set;
@JsonDeserialize(using = SignupRequestDeserializer.class)
public class SignupRequest {

    private String password;
    private String username;
    private String email;
    private Set<String> role;

    public SignupRequest() {
    }

    public SignupRequest(String username, String email, String password, Set<String> role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}
