package com.example.terrainmanagement.dto;



import com.example.terrainmanagement.entity.Terrain;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TerrainRequest {

    private Terrain terrain;
}
