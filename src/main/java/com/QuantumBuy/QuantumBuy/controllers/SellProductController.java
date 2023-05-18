package com.QuantumBuy.QuantumBuy.controllers;

import com.QuantumBuy.QuantumBuy.models.SellProduct;
import com.QuantumBuy.QuantumBuy.services.SellProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sellproducts")
public class SellProductController {
    private SellProductService sellProductService;

    @Autowired
    public SellProductController(SellProductService sellProductService) {
        this.sellProductService = sellProductService;
    }

    @PostMapping("/create")
    public ResponseEntity<SellProduct> createSellProduct(
            @RequestParam("productName") String productName,
            @RequestParam("price") double price,
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
            // Process the sell request
            SellProduct createdSellProduct = sellProductService.createSellProduct(
                    productName, price, quantity, vendorName, productDescription, name, email,
                    productImage.orElse(null), documentation.orElse(null), additionalNotes
            );

            return new ResponseEntity<>(createdSellProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<SellProduct>> getAllSellProducts() {
        List<SellProduct> sellProducts = sellProductService.getAllSellProducts();
        return new ResponseEntity<>(sellProducts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellProduct> getSellProductById(@PathVariable Long id) {
        SellProduct sellProduct = sellProductService.getSellProductById(id);
        if (sellProduct != null) {
            return new ResponseEntity<>(sellProduct, HttpStatus.OK);
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
