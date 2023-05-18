package com.QuantumBuy.QuantumBuy.controllers;

import com.QuantumBuy.QuantumBuy.models.BuyProduct;
import com.QuantumBuy.QuantumBuy.models.ERole;
import com.QuantumBuy.QuantumBuy.models.User;
import com.QuantumBuy.QuantumBuy.services.BuyProductService;
import com.QuantumBuy.QuantumBuy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buyproducts")
public class BuyProductController {
    private BuyProductService buyProductService;
    private UserService userService;

    @Autowired
    public BuyProductController(BuyProductService buyProductService, UserService userService) {
        this.buyProductService = buyProductService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<BuyProduct> createBuyProduct(
            @RequestParam("productName") String productName,
            @RequestParam("priceRange") double priceRange,
            @RequestParam("quantity") int quantity,
            @RequestParam("vendorName") String vendorName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam(value = "productImage", required = false) Optional<MultipartFile> productImage,
            @RequestParam(value = "documentation", required = false) Optional<MultipartFile> documentation,
            @RequestParam("additionalNotes") String additionalNotes
    ) {
        try {
            // Process the buy request
            BuyProduct createdBuyProduct = buyProductService.createBuyProduct(
                    productName, priceRange, quantity, vendorName, productDescription, name, email,
                    productImage.orElse(null), documentation.orElse(null), additionalNotes
            );

            return new ResponseEntity<>(createdBuyProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<BuyProduct>> getAllBuyProducts() {
        List<BuyProduct> buyProducts = buyProductService.getAllBuyProducts();
        return new ResponseEntity<>(buyProducts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuyProduct> getBuyProductById(@PathVariable Long id) {
        BuyProduct buyProduct = buyProductService.getBuyProductById(id);
        if (buyProduct != null) {
            return new ResponseEntity<>(buyProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add more controller methods as needed

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
