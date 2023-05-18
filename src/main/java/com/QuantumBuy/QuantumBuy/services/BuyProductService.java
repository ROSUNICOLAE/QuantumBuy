package com.QuantumBuy.QuantumBuy.services;

import com.QuantumBuy.QuantumBuy.models.BuyProduct;
import com.QuantumBuy.QuantumBuy.repositories.BuyProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class BuyProductService {
    private BuyProductRepository buyProductRepository;

    @Autowired
    public BuyProductService(BuyProductRepository buyProductRepository) {
        this.buyProductRepository = buyProductRepository;
    }

    public BuyProduct createBuyProduct(
            String productName, double price, int quantity, String vendorName, String productDescription,
            String name, String email, MultipartFile image, MultipartFile documentation, String additionalNotes
    ) throws IOException {
        BuyProduct buyProduct = new BuyProduct();
        buyProduct.setProductName(productName);
        buyProduct.setPrice(price);
        buyProduct.setQuantity(quantity);
        buyProduct.setVendorName(vendorName);
        buyProduct.setProductDescription(productDescription);
        buyProduct.setName(name);
        buyProduct.setEmail(email);
        buyProduct.setAdditionalNotes(additionalNotes);

        // Save the image and documentation files
        String imageFilename = saveFile(image);
        String documentationFilename = saveFile(documentation);
        buyProduct.setImage(imageFilename);
        buyProduct.setDocumentation(documentationFilename);

        return buyProductRepository.save(buyProduct);
    }

    public List<BuyProduct> getAllBuyProducts() {
        return buyProductRepository.findAll();
    }

    public BuyProduct getBuyProductById(Long id) {
        return buyProductRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("BuyProduct not found with id: " + id));
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // Generate a unique filename
        String extension = getFileExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID().toString() + extension;

        // Save the file to a directory (e.g., uploads directory)
        Path filePath = Path.of("uploads", filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filename;
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex != -1) {
            return filename.substring(dotIndex);
        }
        return "";
    }
}

