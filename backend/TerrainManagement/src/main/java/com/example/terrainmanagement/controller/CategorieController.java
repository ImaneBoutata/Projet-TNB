package com.example.terrainmanagement.controller;


import com.example.terrainmanagement.entity.Categorie;
import com.example.terrainmanagement.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categorie")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/all")
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    //======================================================================================
    @PostMapping("/save")
    public String saveCategory(@RequestBody Categorie categorieTerrain) {
        return categorieService.saveCategory(categorieTerrain);
    }

    //======================================================================================
    @GetMapping("/{id}")
    public Optional<Categorie> getCategoryById(@PathVariable Long id) {
        return categorieService.findById(id);
    }

    //======================================================================================
    @GetMapping("/nom/{nomCategorie}")
    public Categorie findByNomCategorie(@PathVariable String nomCategorie) {
        return categorieService.findByNomCategorie(nomCategorie);
    }

    @GetMapping("/taux/nom/{nomCategorie}")
    public double getTauxByCategorieName(@PathVariable String nomCategorie) {
        return categorieService.getTauxByCategorieName(nomCategorie);
    }


}

