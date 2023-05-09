package com.QuantumBuy.QuantumBuy.repositoryies;

import com.QuantumBuy.QuantumBuy.Models.UserRole;
import com.nimbusds.oauth2.sdk.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByName(Role name);
}
