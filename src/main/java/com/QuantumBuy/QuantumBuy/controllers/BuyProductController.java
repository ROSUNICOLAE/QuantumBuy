package com.QuantumBuy.QuantumBuy.controllers;

import com.QuantumBuy.QuantumBuy.models.BuyProduct;
import com.QuantumBuy.QuantumBuy.services.BuyProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/buyproducts")
public class BuyProductController {
    private BuyProductService buyProductService;

    @Autowired
    public BuyProductController(BuyProductService buyProductService) {
        this.buyProductService = buyProductService;
    }

    @PostMapping("/create")
    public ResponseEntity<BuyProduct> createBuyProduct(
            @RequestParam("productName") String productName,
            @RequestParam("price") double price,
            @RequestParam("quantity") int quantity,
            @RequestParam("vendorName") String vendorName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("image") MultipartFile image,
            @RequestParam("documentation") MultipartFile documentation,
            @RequestParam("additionalNotes") String additionalNotes
    ) {
        try {
            BuyProduct createdBuyProduct = buyProductService.createBuyProduct(
                    productName, price, quantity, vendorName, productDescription, name, email, image, documentation, additionalNotes
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
        return new ResponseEntity<>(buyProduct, HttpStatus.OK);
    }

    // Add more controller methods as needed

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
