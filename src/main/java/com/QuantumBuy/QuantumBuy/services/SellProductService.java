package com.QuantumBuy.QuantumBuy.services;

import com.QuantumBuy.QuantumBuy.models.SellProduct;
import com.QuantumBuy.QuantumBuy.repositories.SellProductRepository;
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
public class SellProductService {
    private SellProductRepository sellProductRepository;

    @Autowired
    public SellProductService(SellProductRepository sellProductRepository) {
        this.sellProductRepository = sellProductRepository;
    }

    public SellProduct createSellProduct(
            String productName, double price, int quantity, String vendorName, String productDescription,
            String name, String email, MultipartFile image, MultipartFile documentation, String additionalNotes
    ) throws IOException {
        SellProduct sellProduct = new SellProduct();
        sellProduct.setProductName(productName);
        sellProduct.setPrice(price);
        sellProduct.setQuantity(quantity);
        sellProduct.setVendorName(vendorName);
        sellProduct.setProductDescription(productDescription);
        sellProduct.setName(name);
        sellProduct.setEmail(email);
        sellProduct.setAdditionalNotes(additionalNotes);

        // Save the image and documentation files
        String imageFilename = saveFile(image);
        String documentationFilename = saveFile(documentation);
        sellProduct.setImage(imageFilename);
        sellProduct.setDocumentation(documentationFilename);

        return sellProductRepository.save(sellProduct);
    }

    public List<SellProduct> getAllSellProducts() {
        return sellProductRepository.findAll();
    }

    public SellProduct getSellProductById(Long id) {
        return sellProductRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("SellProduct not found with id: " + id));
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
