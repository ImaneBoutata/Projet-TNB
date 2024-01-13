package com.example.taxemanagement.controller;

import com.example.taxemanagement.dto.TaxeRequest;
import com.example.taxemanagement.entity.TaxeTNB;
import com.example.taxemanagement.entity.Terrain;
import com.example.taxemanagement.service.TaxeTNBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taxe-tnb")
public class TaxeTNBController {

    @Autowired
    private TaxeTNBService taxeTNBService;


    @GetMapping("/all")
    public List<TaxeTNB> getAllTaxes() {
        return taxeTNBService.getAllTaxes();
    }

    @PostMapping("/save")
    public TaxeTNB saveTax(@RequestBody TaxeTNB taxeTNB) {
        return taxeTNBService.saveTax(taxeTNB);
    }

    @GetMapping("/{terrainId}/history")
    public List<TaxeTNB> getHistoricalTaxesForTerrain(@PathVariable Long terrainId) {
        return taxeTNBService.getHistoricalTaxesForTerrain(terrainId);
    }

    @GetMapping("findByTerrainAndAnnee/{annee}")
    public TaxeTNB findByTerrainAndAnnee(@RequestBody Terrain terrain, @PathVariable int annee) {
        return taxeTNBService.findByTerrainAndAnnee(terrain, annee);
    }
}

