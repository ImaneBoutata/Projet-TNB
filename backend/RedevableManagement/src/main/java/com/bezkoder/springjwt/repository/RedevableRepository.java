package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Redevable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RedevableRepository extends JpaRepository<Redevable,String> {

    List<Redevable> findByCin(String cin);

}
