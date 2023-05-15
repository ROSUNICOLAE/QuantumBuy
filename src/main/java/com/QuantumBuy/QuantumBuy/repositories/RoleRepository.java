package com.QuantumBuy.QuantumBuy.repositories;

import com.QuantumBuy.QuantumBuy.Models.ERole;
import com.QuantumBuy.QuantumBuy.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
