package com.example.terrainmanagement.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Transactional
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaxeTNB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double tauxTerrain;
    private double surface;
    private int annee;
    private double montantPaye;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "terrain_terrainid")
    private Terrain terrain;

    // Getters and setters
}


