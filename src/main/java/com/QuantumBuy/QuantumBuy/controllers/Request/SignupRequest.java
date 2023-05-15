package com.QuantumBuy.QuantumBuy.controllers.Request;

import java.util.Set;

public class SignupRequest {

    private String password;
    private String username;
    private String email;
    private Set<String> role;


    public SignupRequest(String name, String username, String email, Set<String> role) {
        this.password = password;
        this.username = username;
        this.email = email;
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
