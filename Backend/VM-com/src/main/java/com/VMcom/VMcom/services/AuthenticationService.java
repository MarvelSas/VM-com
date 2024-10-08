package com.VMcom.VMcom.services;

import com.VMcom.VMcom.enums.AppUserRole;
import com.VMcom.VMcom.model.AppUser;
import com.VMcom.VMcom.model.AuthenciationRequest;
import com.VMcom.VMcom.model.AuthenciationResponse;
import com.VMcom.VMcom.model.RegisterRequest;
import com.VMcom.VMcom.repository.AppUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenciationResponse register(RegisterRequest request) {
        if(appUserRepository.findByUsername(request.getEmail()).isPresent()){
            throw new InvalidParameterException("User with email "+request.getEmail()+" already exist");
        }

        var user = new AppUser(
                request.getFirstname(),
                request.getLastname(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                AppUserRole.USER,
                false,
                true);
        AppUser appUser = appUserRepository.save(user);
        HashMap<String,Object> claims = new HashMap<>();
        claims.put("roles",user.getAppUserRole());
        var jwtToken = jwtService.generateToken(claims,user);
        var jwtRefreshToken = jwtService.generateRefreshToken(user);
        return AuthenciationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();

    }

    public AuthenciationResponse authenticate(AuthenciationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = appUserRepository.findByUsername(request.getUsername())
                .orElseThrow(); //todo Add good exception

        HashMap<String,Object> claims = new HashMap<>();
        claims.put("roles",user.getAppUserRole());
        var jwtToken = jwtService.generateToken(claims,user);
        var jwtRefreshToken = jwtService.generateRefreshToken(user);
        return AuthenciationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();

    }

    public AuthenciationResponse refresthToken(HttpServletRequest request) {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        AuthenciationResponse authenciationResponse = new AuthenciationResponse();
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return authenciationResponse;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractEmail(refreshToken);
        if(username != null){
            var user = this.appUserRepository.findByUsername(username).orElseThrow();
            if(jwtService.isTokenValid(refreshToken,user)){
                String accessToken = jwtService.generateToken(user);
                authenciationResponse = AuthenciationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();

            }
            return authenciationResponse;
        }

        return authenciationResponse;
    }
}
