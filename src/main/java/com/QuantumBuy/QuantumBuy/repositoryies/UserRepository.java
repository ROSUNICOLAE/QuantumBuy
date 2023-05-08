package com.QuantumBuy.QuantumBuy.repositoryies;
import com.QuantumBuy.QuantumBuy.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
