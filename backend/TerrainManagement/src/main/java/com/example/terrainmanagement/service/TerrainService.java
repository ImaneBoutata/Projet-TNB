package com.example.terrainmanagement.service;

import com.example.terrainmanagement.entity.Categorie;

import com.example.terrainmanagement.entity.TaxeTNB;
import com.example.terrainmanagement.entity.Terrain;
import com.example.terrainmanagement.entity.User;
import com.example.terrainmanagement.repository.CategorieRepository;
import com.example.terrainmanagement.repository.TerrainRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TerrainService {
    @Autowired
    private RestTemplate restTemplate;


    @Autowired
    private CategorieService categorieService;
    private final TerrainRepository terrainRepository;

    @Autowired
    public TerrainService(TerrainRepository terrainRepository) {
        this.terrainRepository = terrainRepository;
    }

    //=====================================================================================
    public List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }

    public String saveTerrain(Terrain terrain) {
        // Additional logic for saving a terrain
        if (terrain.getSurface() <= 0) {
            return "surface can not be negative ";
        } else {
            try {
               // User redevable = restTemplate.getForObject("http://localhost:8888/REDEVABLE-SERVICE/redevable/" + terrain.getProprietaire().getCin(), User.class);
                Categorie categorie= categorieService.findByNomCategorie(terrain.getCategorie().getNomCategorie());
               // terrain.setProprietaire(redevable);
                terrain.setCategorie(categorie);
                terrainRepository.save(terrain);
                return "terrain added";
            } catch (Exception e) {
                // Handle exceptions, log, or perform other error handling
                e.printStackTrace();
                return e.getMessage();
            }
        }
    }

    public Terrain getTerrainById(Long id) {
        return terrainRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Terrain with ID " + id + " not found."));
    }

    public double calculateTax(Long terrainId) {
        // Implement logic to calculate tax based on terrainId
        Optional<Terrain> terrain = terrainRepository.findById(terrainId);
        Categorie categorie= categorieService.findByNomCategorie(terrain.get().getCategorie().getNomCategorie());
        return terrain.get().getSurface() * categorie.getTaux();
    }

    public boolean isTaxPaidForYear(Long terrainId, int year) {
        // Implement logic to check if the tax for the specified year is paid
        Terrain terrain = terrainRepository.findById(terrainId)
                .orElseThrow(()-> new EntityNotFoundException("terrain with ID " + terrainId + " not found"));
        // Use RestTemplate to call the other microservice's API
        String apiUrl = "http://localhost:8888/TAXE-MANAGEMENT/taxe-tnb/findByTerrainAndAnnee/{annee}";

        TaxeTNB taxRecords = restTemplate.getForObject(apiUrl, TaxeTNB.class, terrain, year);

        if(taxRecords == null) {return false;} else {return true;}
    }

    public Optional<Terrain> findById(Long aLong) {
        return terrainRepository.findById(aLong);
    }

    public void deleteById(Long aLong) {
        terrainRepository.deleteById(aLong);
    }

    public int update(Terrain terrain){
        if(terrain.getTerrainID()!=null){
            terrainRepository.save(terrain);
            return 1;
        }else {
            return 0;
        }
    }
// Additional methods for CRUD operations and other functionalities
}

