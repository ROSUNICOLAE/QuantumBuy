package com.QuantumBuy.QuantumBuy.models;

import java.util.Arrays;

public enum ERole {
    BUYER,
    SELLER,
    ROLE_ADMIN;

    public static ERole fromString(String role) {
        return Arrays.stream(values())
                .filter(r -> r.name().equalsIgnoreCase(role))
                .findFirst()
                .orElse(BUYER); // Default role if no match is found
    }
}
