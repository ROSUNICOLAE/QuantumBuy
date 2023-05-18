package com.QuantumBuy.QuantumBuy.controllers;

import com.QuantumBuy.QuantumBuy.models.User;
import com.QuantumBuy.QuantumBuy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/all")
    public List<User> getUsersAPI() {
        System.out.println(userService.getUsers());
        return userService.getUsers();
    }
}
