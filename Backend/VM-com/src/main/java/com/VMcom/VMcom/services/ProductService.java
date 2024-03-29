package com.VMcom.VMcom.services;


import com.VMcom.VMcom.model.Product;
import com.VMcom.VMcom.model.ProductCategory;
import com.VMcom.VMcom.repository.ProductCategoryRepository;
import com.VMcom.VMcom.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;


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

    public boolean addProduct(Product product){

        //TODO ADD verification if category already exist in database.
        Product newProduct = new Product(product.getName(),product.getDescription(),product.getPrice(),product.getPhotoUrl(),product.getAmount(),product.getProductCategory());

        productRepository.save(newProduct);

        return true;
    }

    public List<Product> getProductsByCategory(Long categoryId){

        return productRepository.findByCategory(categoryId);
    }


}
