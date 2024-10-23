package com.VMcom.VMcom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue()
    private Long id;

    @NotBlank(message = "Street is required")
    private String street;
    @NotBlank(message = "Zip code is required")
    private String zipCode;
    @NotBlank(message = "City is required")
    private String city;
    @JsonIgnore
    @ManyToOne      
    @JoinColumn(name = "appUser_id")
    private AppUser appUser;
}
