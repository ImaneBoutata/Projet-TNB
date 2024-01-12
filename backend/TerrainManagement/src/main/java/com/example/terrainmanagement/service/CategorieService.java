package com.example.terrainmanagement.service;


import com.example.terrainmanagement.entity.Categorie;
import com.example.terrainmanagement.repository.CategorieRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {

    @Autowired
     CategorieRepository categorieRepository;

    //==============================================================================================
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    public String saveCategory(Categorie categorieTerrain) {
        Categorie C = categorieRepository.findByNomCategorie(categorieTerrain.getNomCategorie());
        if(C==null){categorieRepository.save(categorieTerrain);return "categorie added";}
        else return "categorie with name "+C.getNomCategorie()+" already exists";
    }

    public Optional<Categorie> findById(Long aLong) {
        return categorieRepository.findById(aLong);
    }

    public Categorie findByNomCategorie(String nomCategorie) {
        return categorieRepository.findByNomCategorie(nomCategorie);
    }
    //==============================================================================================



    // Additional methods for CRUD operations and retrieving tax rate by category
}


