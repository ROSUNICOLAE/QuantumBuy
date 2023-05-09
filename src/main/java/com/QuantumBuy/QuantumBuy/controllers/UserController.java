package com.QuantumBuy.QuantumBuy.controllers;




import com.QuantumBuy.QuantumBuy.Models.User;
import com.QuantumBuy.QuantumBuy.Models.UserRole;
import com.QuantumBuy.QuantumBuy.repositoryies.UserRepository;

import com.QuantumBuy.QuantumBuy.repositoryies.UserRoleRepository;
import com.QuantumBuy.QuantumBuy.services.UserService;
import com.nimbusds.oauth2.sdk.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/Users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRoleRepository roleRepository;

    @GetMapping("/all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody Map<String, Object> payload) {
        String firstname = (String) payload.get("firstname");
        String lastname = (String) payload.get("lastname");
        String email = (String) payload.get("email");
        String password = (String) payload.get("password");
        String role = (String) payload.get("role");

        User existingUser = userService.validateAndGetUserByUsername(email);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("A user with this email already exists");
        }

        User newUser = User.builder()
                .firstname(firstname)
                .lastname(lastname)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(UserRole.valueOf(role))
                .build();
        userService.addUser(newUser);

        return ResponseEntity.ok().body("User added successfully");
    }


}
