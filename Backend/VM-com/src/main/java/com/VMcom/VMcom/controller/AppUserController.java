package com.VMcom.VMcom.controller;

import com.VMcom.VMcom.model.AppUserDAO;
import com.VMcom.VMcom.model.Response;
import com.VMcom.VMcom.services.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/appUser")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @PatchMapping("")
    public ResponseEntity<Response> putAppUser(@RequestBody AppUserDAO appUserDAO){


        try {

            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("data", appUserService.updateAppUserDetails(appUserDAO)))
                            .message("User details updated successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        }catch (Exception e){

            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("Message", e.getMessage()))
                            .message("User details were not updated successfully")
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .build()
            );


        }


    }
}