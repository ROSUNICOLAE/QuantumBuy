package com.QuantumBuy.QuantumBuy.repositories;

import com.QuantumBuy.QuantumBuy.models.SellProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellProductRepository extends JpaRepository<SellProduct, Long> {
    List<SellProduct> findByProductName(String productName);
    List<SellProduct> findByVendorName(String vendorName);
    List<SellProduct> findByEmail(String email);
    List<SellProduct> findByProductNameContainingIgnoreCase(String productName);
    List<SellProduct> findByVendorNameContainingIgnoreCase(String vendorName);
    List<SellProduct> findByProductDescriptionContainingIgnoreCase(String productDescription);
    List<SellProduct> findByAdditionalNotesContainingIgnoreCase(String additionalNotes);
    // Add more custom query methods as needed
}
