package com.QuantumBuy.QuantumBuy.repositories;

import com.QuantumBuy.QuantumBuy.Models.UserRole;
import com.QuantumBuy.QuantumBuy.Models.UserRoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByRole(UserRoleEnum role);
}

