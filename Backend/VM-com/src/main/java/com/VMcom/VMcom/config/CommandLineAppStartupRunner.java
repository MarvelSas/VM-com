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

import java.util.Arrays;

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
        ProductCategory productCategory1 = productCategoryRepository.save(new ProductCategory("Monitory"));
        ProductCategory productCategory2 = productCategoryRepository.save(new ProductCategory("Telefony komórkowe"));

        //Add product
        productRepository.save(new Product("Komputer", "Dell",12.5, Arrays.asList("test"),1, 2L,productCategory1));


    }
}
