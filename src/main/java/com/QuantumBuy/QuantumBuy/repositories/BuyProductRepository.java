package com.QuantumBuy.QuantumBuy.repositories;

import com.QuantumBuy.QuantumBuy.models.BuyProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyProductRepository extends JpaRepository<BuyProduct, Long> {
    List<BuyProduct> findByProductName(String productName);
    List<BuyProduct> findByVendorName(String vendorName);
    List<BuyProduct> findByEmail(String email);
    List<BuyProduct> findByProductNameContainingIgnoreCase(String productName);
    List<BuyProduct> findByVendorNameContainingIgnoreCase(String vendorName);
    List<BuyProduct> findByProductDescriptionContainingIgnoreCase(String productDescription);
    List<BuyProduct> findByAdditionalNotesContainingIgnoreCase(String additionalNotes);
    // Add more custom query methods as needed
}
