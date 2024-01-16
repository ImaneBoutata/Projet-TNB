package com.example.terrainmanagement.repository;

import com.example.terrainmanagement.entity.Categorie;
import com.example.terrainmanagement.entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain,Long> {

    List<Terrain> findByCategorie(Categorie categorie);
}
