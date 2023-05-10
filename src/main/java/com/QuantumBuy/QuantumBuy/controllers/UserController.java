package com.QuantumBuy.QuantumBuy.controllers;

import com.QuantumBuy.QuantumBuy.Models.User;
import com.QuantumBuy.QuantumBuy.Models.UserRoleEnum;
import com.QuantumBuy.QuantumBuy.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<String> addUser(@RequestBody Map<String, Object> payload, HttpServletResponse response) {
        String firstname = (String) payload.get("firstname");
        String lastname = (String) payload.get("lastname");
        String email = (String) payload.get("email");
        String password = (String) payload.get("password");
        String role = (String) payload.get("role");
        response.setHeader("Access-Control-Allow-Origin", "*");
        User existingUser = userService.validateAndGetUserByUsername(email);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("A user with this email already exists");
        }

        UserRoleEnum userRoleEnum = UserRoleEnum.valueOf(role.toUpperCase());
        if (userRoleEnum == null) {
            // Handle invalid role error
        }

        User newUser = User.builder()
                .firstname(firstname)
                .lastname(lastname)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(userRoleEnum)
                .build();
        userService.addUser(newUser);

        return ResponseEntity.ok().body("User added successfully");
    }
}
