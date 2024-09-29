package com.VMcom.VMcom.repository;

import com.VMcom.VMcom.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long >, PagingAndSortingRepository<Product, Long> {

    @Query(value = "select u from Product u where u.productCategory.id=?1")
    List<Product> findByCategory(Long categoryId);

    @Query(value = "select u from Product u where u.productCategory.id=?1 and u.price>?2 and u.price<?3 and u.amount>0 and u.name like %?4%")
    List<Product> findByCategoryAndPriceBetweenMinAndMaxValueAndByNameAndIfItIsOnStock(Long categoryId, Double minPrice, Double maxPrice,String name, Pageable pageable);
    @Query(value = "select u from Product u where u.productCategory.id=?1 and u.price>?2 and u.price<?3 and u.amount=0 and u.name like %?4%")
    List<Product> findByCategoryAndPriceBetweenMinAndMaxValueAndByNameAndIfItIsNotOnStock(Long categoryId,Double minPrice,Double maxPrice,String name,Pageable pageable);

}
