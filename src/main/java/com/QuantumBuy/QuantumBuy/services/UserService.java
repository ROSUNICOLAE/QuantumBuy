package com.QuantumBuy.QuantumBuy.services;

import com.QuantumBuy.QuantumBuy.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers(){return userRepository.findAll();}
    public User addUser(User user){return userRepository.save(user);}

    public Optional<User> findByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    public User validateAndGetUserByUsername(String username) {
        return findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(String.format("User with username %s not found", username)));
    }
}
