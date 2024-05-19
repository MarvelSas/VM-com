package com.VMcom.VMcom.config;

import com.VMcom.VMcom.enums.AppUserRole;
import com.VMcom.VMcom.model.AppUser;
import com.VMcom.VMcom.model.Product;
import com.VMcom.VMcom.model.ProductCategory;
import com.VMcom.VMcom.repository.AppUserRepository;
import com.VMcom.VMcom.repository.ProductCategoryRepository;
import com.VMcom.VMcom.repository.ProductRepository;
import com.VMcom.VMcom.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static com.VMcom.VMcom.enums.AppUserRole.*;

@Component
@RequiredArgsConstructor
public class CommandLineAppStartupRunner implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {


        //Add admin user
        AppUser admin = new AppUser(
                "Admin",
                "",
                "admin@gmail.com",
                passwordEncoder.encode("admin123"),
                ADMIN,
                false,
                true);

        appUserRepository.save(admin);


        //Add test product category
        ProductCategory productCategory = productCategoryRepository.save(new ProductCategory("Komputtery"));

        //Add product
        productRepository.save(new Product("Komputer", "Dell",12.5,"test", 2L,productCategory));

    }
}
