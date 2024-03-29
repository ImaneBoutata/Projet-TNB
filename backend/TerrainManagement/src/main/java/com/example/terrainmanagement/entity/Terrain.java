package com.example.terrainmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Transactional
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Terrain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "terrain_terrainid")
    private Long terrainID;
    private double surface;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    @ManyToOne
    @JoinColumn(name = "proprietaire_cin")
    private User proprietaire;

    @JsonBackReference
    @OneToMany(mappedBy = "terrain", cascade = CascadeType.ALL)
    private List<TaxeTNB> taxesTNB;

    // Getters and setters
}
