package com.example.taxemanagement.service;


import com.example.taxemanagement.entity.TaxeTNB;
import com.example.taxemanagement.entity.Terrain;
import com.example.taxemanagement.repository.TaxeTNBRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
  //  @Autowired
    //private TerrainService terrainService;

    @Autowired
    private TaxeTNBRepository taxeTNBRepository;

    public List<TaxeTNB> getAllTaxes() {
        return taxeTNBRepository.findAll();
    }

    public TaxeTNB saveTax(TaxeTNB taxeTNB) {
        // Additional logic for saving a tax
        Terrain terrain= restTemplate.getForObject("http://TERRAIN-MANAGEMENT/terrain/"+taxeTNB.getTerrain().getTerrainID(), Terrain.class);
        //Terrain terrain = terrainService.getTerrainById(taxeTNB.getTerrain().getTerrainID());
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
        Terrain terrain= restTemplate.getForObject("http://TERRAIN-MANAGEMENT/terrain/"+terrainId, Terrain.class);
        //Terrain terrainById = terrainService.getTerrainById(terrainId);
        if(terrain==null){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Terrain with ID " + terrainId + " not found.");}
    }

    public TaxeTNB findByTerrainAndAnnee(Terrain terrain, int annee) {
        return taxeTNBRepository.findByTerrainAndAnnee(terrain, annee);
    }
}

