package com.VMcom.VMcom.controller;

import com.VMcom.VMcom.model.AuthenciationRequest;
import com.VMcom.VMcom.model.AuthenciationResponse;
import com.VMcom.VMcom.model.RegisterRequest;
import com.VMcom.VMcom.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthencicationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenciationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenciationResponse> authenticate(@RequestBody AuthenciationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }
}
