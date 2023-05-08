package com.QuantumBuy.QuantumBuy.repositoryies;

import com.QuantumBuy.QuantumBuy.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role name);
}
