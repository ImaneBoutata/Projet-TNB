package com.example.terrainmanagement.controller;


import com.example.terrainmanagement.dto.TerrainRequest;
import com.example.terrainmanagement.entity.Terrain;
import com.example.terrainmanagement.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        //Terrain terrain = request.getTerrain();
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

    @GetMapping("/{terrainId}/is-tax-paid")
    public boolean isTaxPaidForYear(@PathVariable Long terrainId, @RequestParam int year) {
        return terrainService.isTaxPaidForYear(terrainId, year);
    }

    @GetMapping("/findById/{id}")
    public Optional<Terrain> findById(@PathVariable Long aLong) {
        return terrainService.findById(aLong);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        terrainService.deleteById(id);
    }
    @PutMapping("/update")
    public int update(Terrain terrain) {
        return terrainService.update(terrain);
    }
}

