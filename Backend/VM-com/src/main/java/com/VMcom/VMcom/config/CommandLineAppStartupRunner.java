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
        productRepository.save(new Product("LG Ultragear 27GP850P NanoIPS HDR", "Zachwycający design oraz niezwykle bogata funkcjonalność – to czyni z monitora LG 27GP850P-B narzędzie, dzięki któremu odkryjesz gaming na nowo. Solidna konstrukcja połączona z panelem Nano IPS WQHD oferuje najlepsze doznania z gry w każdym calu. Bogate kolory, najdrobniejsze szczegóły i niezwykle szybki czas reakcji to cechy, dzięki którym odniesiesz sukces na wirtualnych polach bitwy. Poznaj gamingowy monitor LG 27GP850P-B.",1199.00, Arrays.asList("lg1.jpg", "lg2.jpg", "lg3.jpg", "lg4.jpg", "lg5.jpg", "lg6.jpg", "lg7.jpg"),0, 2L,productCategory1));
        productRepository.save(new Product("Nothing Phone (2) - 256 GB + 12 GB", "Odkryj rewolucyjny smartfon Nothing Phone (2) - połączenie doskonałej wydajności, wspaniałego wyświetlacza i innowacyjnych funkcji. Dzięki układowi Snapdragon® 8+ Gen 1, doświadczysz niezrównanej mocy i szybkości działania. Imponujący wyświetlacz OLED o rozmiarze 6,7 cala i jasności pikseli sięgającej 1600 nitów zapewnia niesamowitą jakość obrazu.",2499.00, Arrays.asList("nothing1.jpg", "nothing2.jpg", "nothing3.jpg", "nothing4.jpg", "nothing5.jpg", "nothing6.jpg", "nothing7.jpg"),0, 2L,productCategory2));

    }
}
