package com.VMcom.VMcom.services;

import com.VMcom.VMcom.model.AppUser;
import com.VMcom.VMcom.model.Token;
import com.VMcom.VMcom.repository.AppUserRepository;
import com.VMcom.VMcom.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;
    private final JWTService jwtService;
    private final AppUserRepository appUserRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);
        username = jwtService.extractEmail(jwt);
        if (username != null) {
            AppUser appUser = appUserRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User with username "+username+" not found"));
            List<Token> tokens = tokenRepository.findAllValidTokensByUser(appUser.getId());

            if (!tokens.isEmpty()) {
                tokens.forEach(t ->{
                    t.setRevoked(true);
                    t.setExpired(true);
                });

                tokenRepository.saveAll(tokens);

            }

        }

    }
}
