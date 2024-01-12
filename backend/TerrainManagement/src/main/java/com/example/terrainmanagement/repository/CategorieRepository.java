package com.example.terrainmanagement.repository;

import com.example.terrainmanagement.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CategorieRepository extends JpaRepository<Categorie,Long> {
    Categorie findByNomCategorie(String nomCategorie);

    List<Categorie> findAll();
}
