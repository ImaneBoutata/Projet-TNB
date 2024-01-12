package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")

public class Redevable extends User{


    private String cin;
    private String nom;
    private String prenom;
    private String adresse;

    @JsonIgnore
    @OneToMany(mappedBy = "proprietaire", cascade = CascadeType.ALL)
    private List<Terrain> terrains;

}
