package com.example.terrainmanagement.controller;


import com.example.terrainmanagement.dto.TerrainRequest;
import com.example.terrainmanagement.entity.Categorie;
import com.example.terrainmanagement.entity.Terrain;
import com.example.terrainmanagement.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/terrain")
public class TerrainController {
    private final TerrainService terrainService;

    @Autowired
    public TerrainController(TerrainService terrainService) {
        this.terrainService = terrainService;
    }

    @GetMapping("/all")
    public List<Terrain> getAllTerrains() {
        return terrainService.getAllTerrains();
    }

    @PostMapping("/save")
    public String saveTerrain(@RequestBody Terrain request) {
        return terrainService.saveTerrain(request);
    }

    @GetMapping("/{id}")
    public Terrain getTerrainById(@PathVariable Long id) {
        return terrainService.getTerrainById(id);
    }

    @GetMapping("/{terrainId}/calculate-tax")
    public double calculateNonBuiltLandTax(@PathVariable Long terrainId) {
        return terrainService.calculateTax(terrainId);
    }

    @GetMapping("/findByCategorie")
    public List<Terrain> findByCategorie(@RequestBody Categorie categorie) {
        return terrainService.findByCategorie(categorie);
    }
}

