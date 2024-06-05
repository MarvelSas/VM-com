package com.VMcom.VMcom.controller;


import com.VMcom.VMcom.model.Product;
import com.VMcom.VMcom.model.ProductCategory;
import com.VMcom.VMcom.model.Response;
import com.VMcom.VMcom.services.ProductService;
import jakarta.activation.FileTypeMap;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ServletContext servletContext;


    @GetMapping("/getAll")
    public ResponseEntity<Response> getAllProducts(){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("products", productService.getAllProducts()))
                        .message("All products returned")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/get/category/{categoryId}")
    public ResponseEntity<Response> getProductByCategoryId(@PathVariable("categoryId") Long categoryId){

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("products", productService.getProductsByCategory(categoryId)))
                        .message("All products returned with category Id:"+ categoryId)
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


    @PostMapping("/add")
    public ResponseEntity<Response> addProduct(@RequestBody Product product){

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("product", productService.addProduct(product)))
                        .message("Product was added successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/add/productPhoto")
    public ResponseEntity<Response> addProductPhoto(@RequestPart("picture") MultipartFile pictureFiles ){

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("product photo name", productService.addProductPhoto(pictureFiles)))
                        .message("Product photo was added successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


    @PostMapping("/productCategory/add")
    public ResponseEntity<Response> addProductCategory(@RequestBody ProductCategory productCategory){

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("productCategory", productService.addProductCategory(productCategory)))
                        .message("Product category was added successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


    @PatchMapping("/productCategory/update/{productCategoryId}")
    public ResponseEntity<Response> addProductCategory(@PathVariable("productCategoryId") Long productCategoryId,  @RequestBody String name){

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("productCategory", productService.updateProductCategory(productCategoryId,name)))
                        .message("Product category was updated successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


    @GetMapping("/productCategory/getAll")
    public ResponseEntity<Response> getAllProductCategories(){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("productCategories", productService.getAllProductCategories()))
                        .message("All product categories returned")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }



    @GetMapping("/images/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) throws IOException{
        File img = new File("src/main/resources/static/uploaded-pictures/"+filename);
        return ResponseEntity.ok().contentType(MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap().getContentType(img))).body(Files.readAllBytes(img.toPath()));
    }

    @GetMapping("/get/{productId}")
    public ResponseEntity<Response> getProduct(@PathVariable("productId") Long productId){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("product",productService.getProductById(productId)))
                        .message("Product returned")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }




}
