package com.VMcom.VMcom.model;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@NoArgsConstructor

public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "description", length = 8192)
    private String description;
    private Double price;
    private String photoUrl;
    private Long amount;
    @ManyToOne
    @JoinColumn(name = "product_category_id")
    private ProductCategory productCategory;

    public Product(String name, String description, Double price, String photoUrl, Long amount, ProductCategory productCategory) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.photoUrl = photoUrl;
        this.amount = amount;
        this.productCategory = productCategory;
    }
}
