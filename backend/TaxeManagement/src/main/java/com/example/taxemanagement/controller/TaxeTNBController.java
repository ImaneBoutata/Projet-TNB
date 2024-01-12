package com.example.taxemanagement.controller;

import com.example.taxemanagement.dto.TaxeRequest;
import com.example.taxemanagement.entity.TaxeTNB;
import com.example.taxemanagement.service.TaxeTNBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taxe-tnb")
public class TaxeTNBController {
    private final TaxeTNBService taxeTNBService;

    @Autowired
    public TaxeTNBController(TaxeTNBService taxeTNBService) {
        this.taxeTNBService = taxeTNBService;

    }

    @GetMapping("/all")
    public List<TaxeTNB> getAllTaxes() {
        return taxeTNBService.getAllTaxes();
    }

    @PostMapping("/save")
    public TaxeTNB saveTax(@RequestBody TaxeRequest request) {
        TaxeTNB taxeTNB = request.getTaxeTNB();
        return taxeTNBService.saveTax(taxeTNB);
    }

    @GetMapping("/{terrainId}/history")
    public List<TaxeTNB> getHistoricalTaxesForTerrain(@PathVariable Long terrainId) {
        return taxeTNBService.getHistoricalTaxesForTerrain(terrainId);
    }

}

