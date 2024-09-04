package com.VMcom.VMcom.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity
@NoArgsConstructor
public class Photo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "appUser_id")
    private AppUser appUser;

    public Photo(String name, AppUser appUser) {
        this.name = name;
        this.appUser = appUser;
    }
}
