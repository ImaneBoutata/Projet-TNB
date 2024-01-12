package com.example.taxemanagement.repository;




import com.example.taxemanagement.entity.TaxeTNB;
import com.example.taxemanagement.entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxeTNBRepository extends JpaRepository<TaxeTNB, Long> {
    List<TaxeTNB> findByTerrainTerrainID(Long terrainId);
    // Add any additional queries if needed
    TaxeTNB findByTerrainAndAnnee(Terrain terrain, int annee);
}

