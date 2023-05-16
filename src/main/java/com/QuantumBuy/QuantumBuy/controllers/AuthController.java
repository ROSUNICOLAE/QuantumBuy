package com.QuantumBuy.QuantumBuy.controllers;

import java.util.List;

import java.util.stream.Collectors;

import javax.validation.Valid;

import com.QuantumBuy.QuantumBuy.Models.ERole;

import com.QuantumBuy.QuantumBuy.Models.User;
import com.QuantumBuy.QuantumBuy.controllers.Request.ApiResponse;
import com.QuantumBuy.QuantumBuy.controllers.Request.JwtResponse;
import com.QuantumBuy.QuantumBuy.controllers.Request.LoginRequest;
import com.QuantumBuy.QuantumBuy.controllers.Request.SignupRequest;
import com.QuantumBuy.QuantumBuy.repositories.UserRepository;
import com.QuantumBuy.QuantumBuy.security.JwtUtils;
import com.QuantumBuy.QuantumBuy.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;






@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwt)
                .body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new ApiResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse("Error: Email is already in use!"));
        }

        ERole role = ERole.BUYER;

        if (signUpRequest.getRole() != null) {
            if (signUpRequest.getRole().contains("SELLER")) {
                role = ERole.SELLER;
            }
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                role
        );

        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse("User registered successfully!"));
    }
}
