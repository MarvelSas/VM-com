package com.VMcom.VMcom.services;


import com.VMcom.VMcom.model.Product;
import com.VMcom.VMcom.model.ProductCategory;
import com.VMcom.VMcom.repository.ProductCategoryRepository;
import com.VMcom.VMcom.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service

public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    private final Path rootLocation = Paths.get("src/main/resources/static/uploaded-pictures");

    public ProductService(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;


        // verify if storage can be initialized
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }

    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public List<ProductCategory> getAllProductCategories() {return  productCategoryRepository.findAll();}





    public boolean addProductCategory(ProductCategory productCategory){

        //TODO ADD verification if category already exist in database.
        ProductCategory newProductCategory = new ProductCategory(productCategory.getName());

        productCategoryRepository.save(newProductCategory);

        return true;

    }

    public boolean addProduct(Product product, MultipartFile pictureFile ){

        // This is where we will save the file
        Path destinationFile = rootLocation.resolve(
        Paths.get(product.getName()+"_"+pictureFile.getOriginalFilename())).normalize().toAbsolutePath();


        Product newProduct = new Product(product.getName(),product.getDescription(),product.getPrice(),product.getPhotoUrl(),product.getAmount(),product.getProductCategory());

        productRepository.save(newProduct);

        return true;
    }

    public List<Product> getProductsByCategory(Long categoryId){

        return productRepository.findByCategory(categoryId);
    }


}
