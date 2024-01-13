package com.example.taxemanagement.service;


import com.example.taxemanagement.entity.TaxeTNB;
import com.example.taxemanagement.entity.Terrain;
import com.example.taxemanagement.repository.TaxeTNBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaxeTNBService {

    @Autowired
    private RestTemplate restTemplate;


    @Autowired
    private TaxeTNBRepository taxeTNBRepository;

    public List<TaxeTNB> getAllTaxes() {
        return taxeTNBRepository.findAll();
    }

    public TaxeTNB saveTax(TaxeTNB taxeTNB) {
        Long idTerrain = taxeTNB.getTerrain().getTerrainID();
        System.out.println("le terrain estttttttt ::::::::::"+ idTerrain);

        Terrain terrain= restTemplate.getForObject("http://localhost:8888/TERRAIN-MANAGEMENT/terrain/"+ idTerrain, Terrain.class);
        if (terrain == null) {
            // Handle the case where the Terrain is not found
            System.out.println("Terrain not found for ID: " + taxeTNB.getTerrain().getTerrainID());
        }
        validateTerrainExistence(terrain.getTerrainID());
        taxeTNB.setTerrain(terrain);
        return taxeTNBRepository.save(taxeTNB);

    }

    public List<TaxeTNB> getHistoricalTaxesForTerrain(Long terrainId) {
        validateTerrainExistence(terrainId);
        return taxeTNBRepository.findByTerrainTerrainID(terrainId);
    }

    // Additional methods for CRUD operations and other functionalities

    private void validateTerrainExistence(Long terrainId) {
        Terrain terrain= restTemplate.getForObject("http://localhost:8888/TERRAIN-MANAGEMENT/terrain/"+terrainId, Terrain.class);
        //Terrain terrainById = terrainService.getTerrainById(terrainId);
        if(terrain==null){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Terrain with ID " + terrainId + " not found.");}
    }

    public TaxeTNB findByTerrainAndAnnee(Terrain terrain, int annee) {
        return taxeTNBRepository.findByTerrainAndAnnee(terrain, annee);
    }
}
