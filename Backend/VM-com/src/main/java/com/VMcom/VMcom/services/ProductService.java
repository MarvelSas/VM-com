package com.VMcom.VMcom.services;


import com.VMcom.VMcom.model.Photo;
import com.VMcom.VMcom.model.Product;
import com.VMcom.VMcom.model.ProductCategory;
import com.VMcom.VMcom.repository.AppUserRepository;
import com.VMcom.VMcom.repository.PhotoRepository;
import com.VMcom.VMcom.repository.ProductCategoryRepository;
import com.VMcom.VMcom.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.hibernate.annotations.NotFound;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service

public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final PhotoRepository photoRepository;

    private final AppUserRepository appUserRepository;


    private final Path rootLocation = Paths.get("src/main/resources/static/uploaded-pictures");

    public ProductService(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository, PhotoRepository photoRepository, AppUserRepository appUserRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.photoRepository = photoRepository;
        this.appUserRepository = appUserRepository;


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





    public ProductCategory addProductCategory(ProductCategory productCategory) throws IllegalArgumentException{

        if(productCategoryRepository.findByName(productCategory.getName()).isPresent()){
            throw new IllegalArgumentException("Product category with  name:"+productCategory.getName()+" exist in database");
        }

        ProductCategory newProductCategory = new ProductCategory(productCategory.getName());

        ProductCategory productCategory1 = productCategoryRepository.save(newProductCategory);

        return productCategory1;

    }


    public ProductCategory updateProductCategory(Long categoryId, String name){

      ProductCategory productCategory =  productCategoryRepository.findById(categoryId).orElseThrow(()-> new IllegalStateException("Product category with id:"+categoryId+"does not exist in database"));

      productCategory.setName(name);

      productCategoryRepository.save(productCategory);

        System.out.println(productCategory.getName());

      return productCategory;

    }


    public boolean addProduct(Product product ){

        productRepository.save(product);

        return true;
    }



    public String addProductPhoto(MultipartFile pictureFile){

        //Verify if uuid is unique
        boolean uniqueName = true;
        UUID uuid;
        do{
            uuid = UUID.randomUUID();
            uniqueName=photoRepository.findByName(uuid.toString()).isPresent();
            System.out.println(uuid);

        }while(uniqueName);

        String extension = FilenameUtils.getExtension(pictureFile.getOriginalFilename());
        String photoName = uuid+"."+extension;



        try {
            // This is where we will save the file
            Path destinationFile = rootLocation.resolve(
                    Paths.get(photoName)).normalize().toAbsolutePath();

            Files.copy(pictureFile.getInputStream(), destinationFile);

            photoRepository.save(new Photo(photoName,appUserRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow()));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("File upload failed: " + e.getMessage());
        }

        return photoName;

    }



    public List<Product> getProductsByCategory(Long categoryId){

        return productRepository.findByCategory(categoryId);
    }


    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(()-> new IllegalStateException("Product with id:"+productId+"does not exist in database"));
    }


    public Boolean deleteProductCategory(Long categoryId) throws Exception {

        //check if product category exist
        ProductCategory productCategory  = productCategoryRepository.findById(categoryId).orElseThrow(()-> new IllegalStateException("Product category with id:"+categoryId+"does not exist in database"));


         productCategoryRepository.deleteById(categoryId);

         return true;

    }
}
