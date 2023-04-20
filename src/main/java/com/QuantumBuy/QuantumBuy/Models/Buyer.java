package com.QuantumBuy.QuantumBuy.Models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "buyers")
public class Buyer extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String billingAddress;

    // Constructors, getters and setters
}
