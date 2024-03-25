package com.VMcom.VMcom.repository;

import com.VMcom.VMcom.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long > {


    @Query(value = "select u from Product u where u.productCategory.id=1")
    List<Product> findByCategory(Long categoryId);
}
