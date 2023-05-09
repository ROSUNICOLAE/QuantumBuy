package com.QuantumBuy.QuantumBuy.repositories;

import com.QuantumBuy.QuantumBuy.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
      select t from Token t inner join User u
      on t.user.id = u.id
      where u.email = :email and (t.expired = false or t.revoked = false)
      """)
    List<Token> findAllValidTokenByUser(String email);

    List<Token> findByToken(String token);
}

