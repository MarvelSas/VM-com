package com.VMcom.VMcom.config;

import com.VMcom.VMcom.enums.AppUserRole;
import com.VMcom.VMcom.model.AppUser;
import com.VMcom.VMcom.repository.AppUserRepository;
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

    @Override
    public void run(String... args) throws Exception {

        AppUser admin = new AppUser(
                "Admin",
                "",
                "admin@gmail.com",
                passwordEncoder.encode("admin123"),
                USER,
                false,
                true);

        appUserRepository.save(admin);

    }
}
