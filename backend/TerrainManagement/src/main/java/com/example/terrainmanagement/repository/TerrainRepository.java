package com.example.terrainmanagement.repository;

import com.example.terrainmanagement.entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain,Long> {

}
