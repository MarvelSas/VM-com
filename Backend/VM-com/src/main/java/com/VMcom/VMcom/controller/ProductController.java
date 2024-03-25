package com.VMcom.VMcom.controller;


import com.VMcom.VMcom.model.Product;
import com.VMcom.VMcom.model.ProductCategory;
import com.VMcom.VMcom.model.Response;
import com.VMcom.VMcom.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;


    @GetMapping("/getAll")
    public ResponseEntity<Response> getAllProducts(){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDate.now())
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
                        .timeStamp(LocalDate.now())
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
                        .timeStamp(LocalDate.now())
                        .data(Map.of("product", productService.addProduct(product)))
                        .message("Product was added successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/productCategory/add")
    public ResponseEntity<Response> addProductCategory(@RequestBody ProductCategory productCategory){

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDate.now())
                        .data(Map.of("productCategory", productService.addProductCategory(productCategory)))
                        .message("Product category was added successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


    @GetMapping("/productCategory/getAll")
    public ResponseEntity<Response> getAllProductCategories(){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDate.now())
                        .data(Map.of("productCategories", productService.getAllProductCategories()))
                        .message("All product categories returned")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }





}
