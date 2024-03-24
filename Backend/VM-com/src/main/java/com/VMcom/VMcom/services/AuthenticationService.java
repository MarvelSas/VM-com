package com.VMcom.VMcom.services;

import com.VMcom.VMcom.enums.AppUserRole;
import com.VMcom.VMcom.model.AppUser;
import com.VMcom.VMcom.model.AuthenciationRequest;
import com.VMcom.VMcom.model.AuthenciationResponse;
import com.VMcom.VMcom.model.RegisterRequest;
import com.VMcom.VMcom.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
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

    public String register(RegisterRequest request) {
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
        appUserRepository.save(user);
        HashMap<String,Object> claims = new HashMap<>();
        claims.put("roles",user.getAppUserRole());
        var jwtToken = jwtService.generateToken(claims,user);
        return jwtToken;

    }

    public String authenticate(AuthenciationRequest request) {

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
        return jwtToken;

    }
}
