package com.bezkoder.springjwt.controllers;



/*import com.bezkoder.springjwt.models.Redevable;
import com.bezkoder.springjwt.models.Terrain;
import com.bezkoder.springjwt.security.services.RedevableImpl;
import com.bezkoder.springjwt.security.services.RedevableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/redevable")
public class RedevableController {
    private final RedevableImpl redevableService;

    @Autowired
    public RedevableController(RedevableImpl redevableService) {
        this.redevableService = redevableService;
    }

    //===================================================================
    @GetMapping("/{cin}/terrains")
    public List<Terrain> findTerrainsByCIN(@PathVariable String cin) {
        return redevableService.findTerrainsByCIN(cin);
    }

    //===================================================================
    @GetMapping("/{cin}")
    public Redevable findByCIN(@PathVariable String cin) {
        return redevableService.getRedevableByCIN(cin);
    }

    //===================================================================
    @GetMapping("/all")
    public List<Redevable> findAll() {
        return redevableService.getAllRedevables();
    }


    //===================================================================
    @PostMapping("/save")
    public Redevable saveRedevable(@RequestBody RedevableRequest request) {
        Redevable re = request.getRedevable();
        return redevableService.saveRedevable(re);
    }

    // Additional endpoints for CRUD operations and other functionalities
}
*/
